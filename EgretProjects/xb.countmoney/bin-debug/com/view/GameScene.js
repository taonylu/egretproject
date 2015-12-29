/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.totalMoney = 0; //当前钱总数
        this.moneyValue = 100; //一张钱的价值
        this.timeLimit = 3; //时间限制
        this.resultUI = new ResultUI(); //结果UI
        this.isDrag = false; //是否拖拽状态
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initFallMoney();
        this.initCountMoney();
    };
    p.onEnable = function () {
        this.startGame();
    };
    p.onRemove = function () {
    };
    p.startGame = function () {
        this.resetGame();
        this.addEventListener(egret.TouchEvent.ENTER_FRAME, this.onFallMoney, this);
        this.staticMoney.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.resetGame = function () {
        //重置下落的钱位置
        this.resetAllFallMoney();
        //重置时间
        this.setTimeLabel(this.timeLimit.toString());
        //重置钱总数
        this.totalMoney = 0;
        this.setMoneyLabel(this.totalMoney.toString());
    };
    p.gameOver = function () {
        this.stopTimer();
        this.staticMoney.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.resultUI.showInScene(this, this.totalMoney);
    };
    p.onTouchBegin = function (e) {
        this.beginY = e.stageY;
        this.isDrag = true;
        this.curCountMoney = this.countMoneyList.pop();
        this.curCountMoney.x = this.staticMoney.x;
        this.curCountMoney.y = this.staticMoney.y;
        this.addChild(this.curCountMoney);
    };
    p.onTouchMove = function (e) {
        if (this.isDrag && this.curCountMoney) {
            this.curCountMoney.y += e.stageY - this.beginY;
            this.beginY = e.stageY;
        }
    };
    p.onTouchEnd = function (e) {
        //滑动距离超过一段距离
        if (this.isDrag && this.curCountMoney && (Math.abs(this.curCountMoney.y - this.staticMoney.y) > 10)) {
            //根据距离计算滑动时间
            var time = (this.curCountMoney.y / this.staticMoney.y) * 200;
            var tempMoney = this.curCountMoney;
            this.curCountMoney = null;
            var self = this;
            egret.Tween.get(tempMoney).to({ y: -tempMoney.height }, time).call(function () {
                self.countMoneyList.push(tempMoney);
            });
            //计算钱
            this.totalMoney += this.moneyValue;
            this.setMoneyLabel(this.totalMoney.toString());
            //第一张钱滑动后，开始计时
            if (this.totalMoney == this.moneyValue) {
                this.startTimer();
            }
        }
        //重置拖拽状态
        this.isDrag = false;
    };
    //初始化数钱数组
    p.initCountMoney = function () {
        this.countMoneyList = new Array();
        var bm;
        for (var i = 0; i < 10; i++) {
            bm = new egret.Bitmap(RES.getRes("m0_png"));
            this.countMoneyList.push(bm);
        }
    };
    //初始化下落的钱
    p.initFallMoney = function () {
        this.fallMoneyList = new Array();
        var bm;
        for (var i = 0; i < 3; i++) {
            bm = new egret.Bitmap(RES.getRes("d0_png"));
            bm.anchorOffsetX = bm.width / 2;
            bm.anchorOffsetY = bm.height / 2;
            this.fallMoneyList.push(bm);
            this.resetFallMoneyPos(bm);
            this.fallMoneyGroup.addChild(bm);
        }
        this.fallEdge = GameConst.stage.stageHeight + bm.height;
    };
    //下落钱处理函数
    p.onFallMoney = function () {
        var len = this.fallMoneyList.length;
        var bm;
        for (var i = 0; i < len; i++) {
            bm = this.fallMoneyList[i];
            bm.rotation += 10;
            bm.y += 20;
            if (bm.y >= this.fallEdge) {
                this.resetFallMoneyPos(bm);
            }
        }
    };
    //重置下落钱位置
    p.resetFallMoneyPos = function (bm) {
        bm.y = -bm.height - Math.random() * 600; //随机钱位置
        bm.x = Math.random() * 640;
    };
    //重置所有下落的钱位置
    p.resetAllFallMoney = function () {
        var len = this.fallMoneyList.length;
        for (var i = 0; i < len; i++) {
            this.resetFallMoneyPos(this.fallMoneyList[i]);
        }
    };
    p.setMoneyLabel = function (str) {
        this.moneyLabel.text = str;
    };
    p.setTimeLabel = function (str) {
        this.timeLabel.text = str;
    };
    p.startTimer = function () {
        if (this.gameTimer == null) {
            this.gameTimer = new egret.Timer(800);
        }
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    p.onGameTimer = function () {
        var time = this.timeLimit - this.gameTimer.currentCount;
        this.setTimeLabel(time.toString());
        if (time <= 0) {
            this.gameOver();
        }
    };
    p.stopTimer = function () {
        if (this.gameTimer != null) {
            this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this);
        }
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
