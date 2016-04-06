/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.farPotList = new Array(); //远点列表
        this.nearPotList = new Array(); //进点列表
        this.trackXList = []; //赛道X轴偏移量
        this.trackYList = []; //赛道y轴偏移量
        this.playerList = new Array(); //玩家列表
        this.carrotPool = ObjectPool.getPool(Carrot.NAME, 1); //胡萝卜对象池
        this.stonePool = ObjectPool.getPool(Stone.NAME, 1); //石头对象池
        this.itemList = []; //物品
        this.isSingleMode = true; //是否单人模式
        this.singleTrackNum = 3; //单人赛道数量
        this.multiTrackNum = 7; //多人赛道
        this.moveSpeed = 10; //移动速度
        //创建地图，算法以单赛道创建为主，每隔一段距离创建一次
        this.count = 0;
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
    };
    p.onEnable = function () {
        this.resetGame(); //重置游戏
        this.startGame();
    };
    p.onRemove = function () {
    };
    p.startGame = function () {
        this.configListeners();
    };
    p.resetGame = function () {
        this.resetTrack(); //重置赛道
        this.clearFarAndNear(); //清理远点和近点
        this.initFarAndNear(); //初始化远点和近点
        this.resetPlayer(); //重置玩家
        this.resetItem(); //重置移动物体
    };
    p.gameOver = function () {
    };
    p.configListeners = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.deConfigListeners = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.onEnterFrame = function () {
        this.createItem();
        this.moveItem();
    };
    //初始化远点和进点列表
    p.initFarAndNear = function () {
        var len = this.trackNum;
        for (var i = 0; i < len; i++) {
            var far = this["far0" + i];
            var near = this["near0" + i];
            var farPot = new egret.Point(far.x, far.y);
            var nearPot = new egret.Point(near.x, near.y);
            this.farPotList.push(farPot);
            this.nearPotList.push(nearPot);
            far.parent && far.parent.removeChild(far);
            near.parent && near.parent.removeChild(near);
            var dist = egret.Point.distance(farPot, nearPot); //两点距离
            var dist_pow2 = Math.pow(dist, 2); //两点距离平方  
            var y_pow2 = Math.pow((farPot.y - near.y), 2); //两点垂直距离平方
            var xOffset = Math.sqrt(dist_pow2 - y_pow2); //两点水平距离
            if (i < len / 2) {
                xOffset = -xOffset;
            }
            this.trackXList.push(xOffset);
            this.trackYList.push(near.y - farPot.y);
        }
    };
    //清理远点和近点列表
    p.clearFarAndNear = function () {
        this.farPotList.length = 0;
        this.nearPotList.length = 0;
        this.trackXList.length = 0;
    };
    //重置玩家
    p.resetPlayer = function () {
        if (this.myHero == null) {
            this.myHero = new Player();
        }
        this.myHero.anchorOffsetX = this.myHero.width / 2;
        this.myHero.anchorOffsetY = this.myHero.height / 2;
        this.myHero.x = this.nearPotList[1].x;
        this.myHero.y = this.nearPotList[1].y;
        this.myHero.track = Math.floor(this.trackNum / 2);
        this.myHero.isJumping = false;
        this.playerGroup.addChild(this.myHero);
        this.myHero.gotoAndPlay("run", -1);
    };
    //重置物体
    p.resetItem = function () {
        var len = this.itemList.length;
        for (var i = 0; i < len; i++) {
            var fruit = this.itemList[i];
            fruit.recycle();
        }
        this.itemList.length = 0;
    };
    //重置赛道
    p.resetTrack = function () {
        this.trackNum = this.isSingleMode ? this.singleTrackNum : this.multiTrackNum;
    };
    p.createItem = function () {
        this.count++;
        var rand;
        var item;
        if (this.count % 30 == 0) {
            for (var i = 0; i < this.trackNum; i++) {
                rand = Math.random();
                if (rand > 0.2) {
                    item = this.carrotPool.getObject();
                }
                else {
                    item = this.stonePool.getObject();
                }
                item.x = this.farPotList[i].x;
                item.y = this.farPotList[i].y;
                item.z = 0;
                item.track = i;
                item.scaleX = 0;
                item.scaleY = 0;
                this.itemGroup.addChild(item);
                this.itemList.push(item);
            }
        }
    };
    //移动物体
    p.moveItem = function () {
        var len = this.itemList.length;
        var item;
        var track;
        for (var i = len - 1; i >= 0; i--) {
            item = this.itemList[i];
            track = item.track;
            //移动
            item.y += this.moveSpeed;
            var rate = (item.y - this.farPotList[track].y) / this.trackYList[track]; //所在y轴位置比例
            item.x = this.farPotList[track].x + rate * this.trackXList[track];
            item.scaleX = rate;
            item.scaleY = rate;
            //碰撞检测
            if (this.myHero.track == item.track) {
                if (Math.abs(this.myHero.y - item.y) < 100) {
                    var self = this;
                    if (item instanceof Carrot) {
                        item.changeAlpha();
                        this.itemList.splice(i, 1);
                    }
                    else if (item instanceof Stone) {
                        egret.log("hit stone:", item.x, item.y, item.scaleX);
                        this.myHero.gotoAndPlay("jump");
                        egret.Tween.get(this.myHero).to({ y: -200, x: Math.random() * this.stageWidth, rotation: 360 * 3 }, 500).call(function () {
                            self.resetPlayer();
                        });
                    }
                }
            }
            //边界检测
            if (item.y > (this.stageHeight + item.height)) {
                item.recycle();
                this.itemList.splice(i, 1);
            }
        }
    };
    //////////////////////////////////////////////////////
    //------------------Socket数据处理---------------------
    //////////////////////////////////////////////////////
    //跳跃
    p.revAction = function (data) {
        egret.log("revAction:", data);
        var actionType = data.actionType;
        var myTrack = this.myHero.track;
        var self = this;
        if (actionType == "left") {
            if (myTrack > 0) {
                myTrack--;
                egret.Tween.get(this.myHero).to({ x: this.nearPotList[myTrack].x }, 300);
                this.myHero.track = myTrack;
            }
        }
        else if (actionType == "right") {
            if (myTrack < (this.trackNum - 1)) {
                myTrack++;
                egret.Tween.get(this.myHero).to({ x: this.nearPotList[myTrack].x }, 300);
                this.myHero.track = myTrack;
            }
        }
        else if (actionType == "up") {
            if (this.myHero.isJumping == false) {
                this.myHero.isJumping = true;
                var myHeroY = this.myHero.y;
                this.myHero.gotoAndPlay("jump");
                egret.Tween.get(this.myHero).to({ y: this.myHero.y - 500 }, 300).to({ y: myHeroY }, 300).
                    call(function () {
                    self.myHero.isJumping = false;
                    self.myHero.gotoAndPlay("run", -1);
                }, this);
            }
        }
    };
    //发送游戏结束
    p.sendGameOver = function () {
        egret.log("sendGameOver");
        var json;
        if (GameConst.debug) {
            json = {
                scoreList: [{ openid: "ABC", score: 999 }]
            };
        }
        else {
        }
        this.socket.sendMessage("gameOver", json);
    };
    return GameScene;
}(BaseScene));
egret.registerClass(GameScene,'GameScene');
