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
        this.roleList = new Array(); //角色列表，保存3个角色
        this.playerLimit = 3; //玩家人数限制
        this.playerList = new Array(); //当前玩家列表
        this.carrotPool = ObjectPool.getPool(Carrot.NAME, 1); //胡萝卜对象池
        this.bananaPool = ObjectPool.getPool(Banana.NAME, 1); //香蕉对象池
        this.stonePool = ObjectPool.getPool(Stone.NAME, 1); //石头对象池
        this.micePool = ObjectPool.getPool(Mice.NAME); //地鼠对象池
        this.highWoodPool = ObjectPool.getPool(HighWood.NAME, 1); //高木桩对象池
        this.lowWoodPool = ObjectPool.getPool(LowWood.NAME, 1); //矮木桩对象池
        this.waterPool = ObjectPool.getPool(Water.NAME, 1); //水池对象池
        this.scorePoolList = [this.carrotPool, this.bananaPool]; //得分物品对象池数组
        this.zhangAiPoolList = [this.stonePool, this.micePool, this.highWoodPool, this.lowWoodPool, this.waterPool]; //障碍物对象池数组
        this.itemList = []; //物品列表(水果、障碍物)
        this.isSingleMode = false; //是否单人模式
        this.singleTrackNum = 3; //单人赛道数量
        this.multiTrackNum = 7; //多人赛道
        this.moveSpeed = 4; //移动速度
        this.grassSpeedX = 2; //草地X轴移动速度
        this.grassPool = ObjectPool.getPool(Grass.NAME); //草地对象池
        this.grassList = new Array(); //草地数组 
        this.gameTimer = new egret.Timer(1000); //游戏计时器
        this.gameTimeLimit = 10; //游戏时间限制
        this.countDownTimer = new egret.Timer(1000); //倒计时
        this.countDownLimit = 1; //倒计时限制
        //创建地图，算法以单赛道创建为主，每隔一段距离创建一次
        this.count = 0;
        //创建草地
        this.grassCount = 0;
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
        this.resetGame(); //重置游戏
        this.startCountDown(); //开始倒计时
    };
    p.onRemove = function () {
    };
    p.startGame = function () {
        this.configListeners();
        this.startGameTimer();
    };
    p.resetGame = function () {
        this.resetAllPlayer(); //重置所有玩家
        this.clearItem(); //清理移动物体
        this.clearGrass(); //清理草地
    };
    p.gameOver = function () {
        this.stopGameTimer(); //停止游戏计时
        this.deConfigListeners(); //停止物体移动
        this.sendGameOver(); //发送游戏结束
    };
    //初始化场景
    p.initView = function () {
        this.socket = ClientSocket.getInstance();
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
        this.initRole(); //初始化角色
        this.initFarAndNear(); //初始化远点和近点
        this.initGrass(); //初始化草地
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
        this.createGrass();
        this.moveGrass();
    };
    //初始化角色
    p.initRole = function () {
        for (var i = 0; i < this.playerLimit; i++) {
            var player = new Player("player" + i + "_png", "player" + i + "_json", "player" + i);
            player.anchorOffsetX = player.width;
            player.anchorOffsetY = player.height;
            this.roleList.push(player);
        }
    };
    //初始化远点和进点列表
    p.initFarAndNear = function () {
        //赛道数量
        this.trackNum = this.isSingleMode ? this.singleTrackNum : this.multiTrackNum;
        //清理数组
        this.farPotList.length = 0;
        this.nearPotList.length = 0;
        this.trackXList.length = 0;
        //获取赛道近点和远点
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
    //初始化草地
    p.initGrass = function () {
        this.grassPot0.parent && this.grassGroup.removeChild(this.grassPot0);
        this.grassPot1.parent && this.grassGroup.removeChild(this.grassPot1);
    };
    //重置所有玩家
    p.resetAllPlayer = function () {
        //隐藏所有玩家
        var len = this.roleList.length;
        for (var i = 0; i < len; i++) {
            var role = this.roleList[i];
            role.hide();
        }
        //根据用户角色ID，创建用户角色
        var userList = UserManager.getInstance().userList;
        var userNum = userList.length;
        for (var i = 0; i < userNum; i++) {
            var userVO = userList[i];
            var player = this.roleList[userVO.role];
            player.openid = userVO.openid;
            this.playerList.push(player);
        }
        //放置用户
        if (userNum == 1) {
            var player0 = this.playerList[0];
            player0.track = Math.floor(this.trackNum / 2);
            player0.x = this.nearPotList[player0.track].x;
            player0.y = this.nearPotList[player0.track].y;
            player0.hitY = player0.y;
            player0.isJumping = false;
            player0.run();
            this.playerGroup.addChild(player0);
        }
    };
    //根据openid获取Player
    p.getPlayerByOpenid = function (openid) {
        var len = this.playerList.length;
        for (var i = 0; i < len; i++) {
            var player = this.playerList[i];
            if (player.openid == openid) {
                return player;
            }
        }
        return null;
    };
    //玩家撞到障碍物后，重置
    p.resetPlayer = function (player) {
        player.track = Math.floor(this.trackNum / 2);
        player.x = this.nearPotList[player.track].x;
        player.y = this.nearPotList[player.track].y;
        player.isJumping = false;
        player.run();
        this.playerGroup.addChild(player);
    };
    p.createItem = function () {
        this.count++;
        var rand;
        var item;
        if (this.count % 40 == 0) {
            for (var i = 0; i < this.trackNum; i++) {
                rand = Math.random();
                if (rand < 0.7) {
                    item = this.scorePoolList[NumberTool.getRandomInt(0, 1)].getObject();
                }
                else if (rand < 0.9) {
                    item = this.zhangAiPoolList[NumberTool.getRandomInt(0, 4)].getObject();
                }
                else {
                    return;
                }
                item.x = this.farPotList[i].x;
                item.y = this.farPotList[i].y;
                item.z = 0;
                item.track = i;
                item.scaleX = 0.4;
                item.scaleY = 0.4;
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
            //item.scaleX = 0.4 + rate*0.1;
            //item.scaleY = 0.4 + rate*0.1;
            //边界检测
            if (item.y > (this.stageHeight + item.height)) {
                item.recycle();
                this.itemList.splice(i, 1);
                continue;
            }
            //遍历玩家 碰撞检测
            var playerLen = this.playerList.length;
            for (var j = 0; j < playerLen; j++) {
                var player = this.playerList[j];
                if (player.track == item.track) {
                    if (Math.abs(player.hitY - item.y) < player.width) {
                        var self = this;
                        if (item.type == 0) {
                            item.changeAlpha();
                            this.itemList.splice(i, 1);
                        }
                        else if (item.type == 1) {
                            player.die();
                        }
                        else if (item.type == 2) {
                        }
                    }
                }
            }
        }
    };
    //清理物体
    p.clearItem = function () {
        var len = this.itemList.length;
        for (var i = 0; i < len; i++) {
            var item = this.itemList[i];
            item.recycle();
        }
        this.itemList.length = 0;
    };
    p.createGrass = function () {
        this.grassCount++;
        if (this.grassCount % 80 == 0) {
            if (this.grassList.length >= 6) {
                return;
            }
            var rand = Math.random();
            var grass = this.grassPool.getObject();
            grass.randomSkin();
            grass.x = this.grassPot0.x;
            grass.y = this.grassPot0.y;
            grass.speedX = -Math.abs(grass.speedX);
            this.grassGroup.addChild(grass);
            this.grassList.push(grass);
            grass = this.grassPool.getObject();
            grass.randomSkin();
            grass.x = this.grassPot1.x;
            grass.y = this.grassPot1.y;
            grass.speedX = Math.abs(grass.speedX);
            this.grassGroup.addChild(grass);
            this.grassList.push(grass);
        }
    };
    //移动草地
    p.moveGrass = function () {
        var len = this.grassList.length;
        var grass;
        for (var i = len - 1; i >= 0; i--) {
            grass = this.grassList[i];
            grass.x += grass.speedX;
            grass.y += this.moveSpeed;
            if (grass.y > this.stageHeight) {
                grass.recycle();
                this.grassList.splice(i, 1);
            }
        }
    };
    //重置草地
    p.clearGrass = function () {
        var len = this.grassList.length;
        var grass;
        for (var i = 0; i < len; i++) {
            grass = this.grassList[i];
            grass.recycle();
        }
        this.grassList.length = 0;
    };
    //开始游戏计时
    p.startGameTimer = function () {
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    //游戏计时处理
    p.onGameTimerHandler = function () {
        var count = this.gameTimeLimit - this.gameTimer.currentCount;
        if (count <= 0) {
            this.gameOver();
        }
    };
    //停止计时
    p.stopGameTimer = function () {
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.onGameTimerHandler, this);
        this.gameTimer.stop();
    };
    //开始倒计时
    p.startCountDown = function () {
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    };
    //倒计时处理
    p.onCountDownHandler = function () {
        var count = this.countDownLimit - this.countDownTimer.currentCount;
        if (count <= 0) {
            this.stopCountDown();
            this.startGame();
        }
    };
    //停止倒计时
    p.stopCountDown = function () {
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.stop();
    };
    //////////////////////////////////////////////////////
    //------------------Socket数据处理---------------------
    //////////////////////////////////////////////////////
    //跳跃
    p.revAction = function (data) {
        //egret.log("revAction:",data);
        var actionType = data.actionType;
        var openid = data.openid;
        var player = this.getPlayerByOpenid(openid);
        if (player == null) {
            egret.log("行动的Player为null");
            return;
        }
        var myTrack = player.track;
        var self = this;
        if (actionType == "left") {
            if (myTrack > 0) {
                myTrack--;
                egret.Tween.get(player).to({ x: this.nearPotList[myTrack].x }, 300);
                player.track = myTrack;
            }
        }
        else if (actionType == "right") {
            if (myTrack < (this.trackNum - 1)) {
                myTrack++;
                egret.Tween.get(player).to({ x: this.nearPotList[myTrack].x }, 300);
                player.track = myTrack;
            }
        }
        else if (actionType == "up") {
            player.jump();
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
        this.socket.sendMessage("gameOver", json, this.revGameOver, this);
    };
    //接收游戏结束
    p.revGameOver = function (data) {
        //LayerManager.getInstance().runScene(GameManager.getInstance().)
    };
    return GameScene;
}(BaseScene));
egret.registerClass(GameScene,'GameScene');
