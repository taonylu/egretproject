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
        this.carrotPool = ObjectPool.getPool(Carrot.NAME, 20); //胡萝卜对象池
        this.fruitList = []; //二维数组，[赛道][水果]
        this.isSingleMode = true; //是否单人模式
        this.singleTrackNum = 3; //单人赛道数量
        this.multiTrackNum = 7; //多人赛道
        this.trackLenth = 3000; //赛道长度
        this.moveSpeed = 20; //移动速度
        //创建地图，算法以单赛道创建为主，每隔一段距离创建一次
        this.count = 0;
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
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
        this.myHero = new Player();
        this.myHero.anchorOffsetX = this.myHero.width / 2;
        this.myHero.anchorOffsetY = this.myHero.height / 2;
        this.myHero.x = this.nearPotList[1].x;
        this.myHero.y = this.nearPotList[1].y;
        this.playerGroup.addChild(this.myHero);
    };
    //重置物体
    p.resetItem = function () {
        var len = this.fruitList.length;
        for (var i = 0; i < len; i++) {
            var fruit = this.fruitList[i];
            fruit.recycle();
        }
        this.fruitList.length = 0;
    };
    //重置赛道
    p.resetTrack = function () {
        this.trackNum = this.isSingleMode ? this.singleTrackNum : this.multiTrackNum;
    };
    p.createItem = function () {
        this.count++;
        if (this.count % 30 == 0) {
            for (var i = 0; i < this.trackNum; i++) {
                var rand = Math.random();
                //if(rand > 0.8) {
                var carrot = this.carrotPool.getObject();
                carrot.x = this.farPotList[i].x;
                carrot.y = this.farPotList[i].y;
                carrot.track = i;
                carrot.scaleX = carrot.scaleY = 0;
                this.itemGroup.addChild(carrot);
                this.fruitList.push(carrot);
            }
        }
    };
    //移动地图
    p.moveItem = function () {
        var len = this.fruitList.length;
        for (var i = 0; i < len; i++) {
            var fruit = this.fruitList[i];
            var track = fruit.track;
            fruit.z += this.moveSpeed;
            fruit.y = this.farPotList[track].y + fruit.z / this.trackLenth * this.trackYList[track];
            fruit.x = this.farPotList[track].x + fruit.z / this.trackLenth * this.trackXList[track];
            fruit.scaleX = fruit.scaleY = fruit.z / this.trackLenth;
        }
    };
    return GameScene;
}(BaseScene));
egret.registerClass(GameScene,'GameScene');
