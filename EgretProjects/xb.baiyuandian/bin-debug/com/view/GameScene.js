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
        //private packetPool:ObjectPool = ObjectPool.getPool(PacketUI.NAME,3);  //红包对象池
        this.packetPool0 = ObjectPool.getPool("Packet0", 3);
        this.packetPool10 = ObjectPool.getPool("Packet10", 5);
        this.packetPool20 = ObjectPool.getPool("Packet20", 5);
        this.packetPool30 = ObjectPool.getPool("Packet30", 5);
        this.packetPool50 = ObjectPool.getPool("Packet50", 3);
        this.packetPool80 = ObjectPool.getPool("Packet80", 3);
        this.packetPool100 = ObjectPool.getPool("Packet100", 3);
        this.poolList = [this.packetPool0, this.packetPool10, this.packetPool20, this.packetPool30, this.packetPool50, this.packetPool80, this.packetPool100];
        this.packetList = [];
        this.bFirstGame = true; //是否第一次游戏
        this.gameTimer = new egret.Timer(1000); //计时
        this.timeLimit = 20; //时间限制
        this.curTime = this.timeLimit;
        this.snd = SoundManager.getInstance();
        this.os = ""; //操作系统
        this.soundCount = 0; //声音播放次数，超过次数，则不能播放声音，否则会出现异常
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
        this.soundCount = 0;
    };
    p.initView = function () {
        this.validateNow();
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
        this.countDownLabel.parent && this.removeChild(this.countDownLabel);
        this.timeLabel.text = this.timeLimit.toString();
        this.os = egret.Capabilities.os;
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
        LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
    };
    //游戏失败
    p.gameLose = function () {
        egret.Tween.removeTweens(this.bag);
        this.stopGameTimer();
        LayerManager.getInstance().runScene(GameManager.getInstance().gameLoseScene);
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
        egret.Tween.get(this, { loop: true }).wait(700).call(function () {
            count--;
            if (count <= 0) {
                self.countDownComplete();
                return;
            }
            self.countDownLabel.text = count.toString();
        });
    };
    p.countDownComplete = function () {
        egret.Tween.removeTweens(this);
        this.removeChild(this.countDownLabel);
        this.startGameTimer();
        this.launchPacket(); //开始发射红包
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.packetGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPacketTouch, this);
    };
    p.onEnterFrame = function () {
        var len = this.packetList.length;
        for (var i = len - 1; i >= 0; i--) {
            var packet = this.packetList[i];
            packet.x += packet.speedX;
            packet.y += packet.speedY;
            if (packet.y <= -200 || packet.x <= -100 || packet.x >= (this.stageWidth + 100)) {
                packet.recycle();
                this.packetList.splice(i, 1);
            }
        }
        return true;
    };
    //发射红包
    p.launchPacket = function () {
        var packet;
        if (Math.random() > 0.2) {
            //            if(this.curTime >= 15) { //前5秒小额红包，后15秒大额红包
            //                packet = this.poolList[NumberTool.getRandomInt(0,4)].getObject();
            //            } else {
            packet = this.poolList[NumberTool.getRandomInt(0, 6)].getObject();
        }
        else {
            packet = this.poolList[0].getObject();
        }
        packet.x = this.bag.x + this.bag.width / 2;
        packet.y = this.bag.y + this.bag.height / 2;
        packet.shoot();
        this.packetGroup.addChild(packet);
        //再次发射红包
        var time = 250;
        egret.Tween.get(this.bag).wait(time).call(this.launchPacket, this);
    };
    //点击红包
    p.onPacketTouch = function (e) {
        if (e.target instanceof BasePacket || e.currentTarget instanceof BasePacket) {
            //window["playGet"]();
            if (this.os == "Android") {
                if (this.soundCount < 1) {
                    this.soundCount++;
                    this.snd.play(this.snd.get);
                    var self = this;
                    egret.Tween.get(this).wait(1500).call(function () {
                        self.soundCount = 0;
                    });
                }
            }
            else {
                this.snd.play(this.snd.get);
            }
            var packet = e.target;
            this.score += packet.score;
            packet.parent && packet.parent.removeChild(packet);
            if (packet.score <= 0) {
                this.gameLose(); //游戏失败
            }
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
