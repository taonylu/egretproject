/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.score = 0; //分数
        this.packetPool = ObjectPool.getPool(PacketUI.NAME, 3); //红包对象池
        this.bFirstGame = true; //是否第一次游戏
        this.gameTimer = new egret.Timer(1000); //计时
        this.timeLimit = 20;
        this.curTime = this.timeLimit;
        this.bWin = false; //游戏是否胜利
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
        if (this.bFirstGame) {
            this.fallBag();
            this.bFirstGame = false;
        }
        else {
            this.startGame();
        }
    };
    p.onRemove = function () {
    };
    p.initView = function () {
        this.validateNow();
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
        this.countDownLabel.parent && this.removeChild(this.countDownLabel);
        this.timeLabel.text = this.timeLimit.toString();
    };
    p.startGame = function () {
        this.resetGame();
        this.countDown();
    };
    p.resetGame = function () {
        //停止tween
        egret.Tween.removeTweens(this);
        //重置分数
        this.score = 0;
        //重置计时
        this.stopGameTimer();
        this.curTime = this.timeLimit;
        this.timeLabel.text = this.timeLimit.toString();
        this.timeBg.scaleX = 1;
    };
    //游戏胜利
    p.gameWin = function () {
        egret.Tween.removeTweens(this.bag);
        this.stopGameTimer();
        this.bWin = true;
        LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
    };
    //游戏失败
    p.gameLose = function () {
        egret.Tween.removeTweens(this.bag);
        this.stopGameTimer();
        this.bWin = false;
        LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
    };
    p.fallBag = function () {
        this.bag.y = -this.bag.height;
        egret.Tween.get(this.bag).to({ y: (this.stageHeight - this.bag.height / 2 + 100) }, 800, egret.Ease.bounceOut).
            call(this.countDown, this);
    };
    //倒计时
    p.countDown = function () {
        var self = this;
        var count = 5;
        this.addChild(this.countDownLabel);
        this.countDownLabel.text = count.toString();
        egret.Tween.get(this, { loop: true }).wait(1000).call(function () {
            count--;
            if (count <= 0) {
                egret.Tween.removeTweens(this);
                self.removeChild(self.countDownLabel);
                self.startGameTimer();
                self.launchPacket(); //开始发射红包
                return;
            }
            self.countDownLabel.text = count.toString();
        });
    };
    //倒计时结束，发射红包
    p.launchPacket = function () {
        var packet = this.packetPool.getObject();
        packet.x = this.bag.x + this.bag.width / 2;
        packet.y = this.bag.y + this.bag.height / 2;
        this.packetGroup.addChild(packet);
        if (this.curTime >= 10) {
            packet.randomSkin(0, 4);
        }
        else {
            packet.randomSkin(0, 6);
        }
        packet.shoot();
        packet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPacketTouch, this);
        //再次发射红包
        var time = Math.random() * 400;
        egret.Tween.get(this.bag).wait(time).call(this.launchPacket, this);
    };
    //点击红包
    p.onPacketTouch = function (e) {
        window["playGet"]();
        var packet = e.target;
        this.score += packet.score;
        packet.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPacketTouch, this);
        packet.recycle();
        if (packet.score <= 0) {
            this.gameLose(); //游戏失败
        }
    };
    //开始游戏计时
    p.startGameTimer = function () {
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    //游戏计时
    p.onGameTimer = function () {
        this.curTime--;
        if (this.curTime <= 0) {
            this.gameWin();
            return;
        }
        this.timeLabel.text = this.curTime.toString();
        this.timeBg.scaleX = this.curTime / this.timeLimit;
    };
    //停止游戏计时
    p.stopGameTimer = function () {
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this);
        this.gameTimer.stop();
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
