/**
 * 校准
 * @author
 *
 */
var LockScene = (function (_super) {
    __extends(LockScene, _super);
    function LockScene() {
        _super.call(this, "LockSceneSkin");
        this.countDownTimer = new egret.Timer(1000);
        this.countDownLimit = 5;
        /////////////////////////////////////////////////////////
        //-----------------[Socket 数据]-------------------------
        /////////////////////////////////////////////////////////
        //接收锁定
        this.lockNum = 0; //已校准人数
    }
    var d = __define,c=LockScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
        this.initHandY = this.hand.y;
        if (GameConst.debug) {
            this.countDownLimit = 5;
        }
    };
    p.onEnable = function () {
        this.resetScene();
        this.startCountDown();
        this.startHandAnim();
    };
    p.onRemove = function () {
        this.stopHandAnim();
    };
    p.resetScene = function () {
        this.lockNum = 0;
    };
    p.startHandAnim = function () {
        egret.Tween.get(this.hand, { loop: true }).to({ y: this.initHandY - 100 }, 400).to({ y: this.initHandY }, 400);
    };
    p.stopHandAnim = function () {
        egret.Tween.removeTweens(this.hand);
        this.hand.y = this.initHandY;
    };
    p.startCountDown = function () {
        this.countDownLabel.text = this.countDownLimit + "";
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    };
    p.onTimerHandler = function () {
        var count = this.countDownLimit - this.countDownTimer.currentCount;
        if (count <= 0) {
            if (this.parent) {
                this.startGame();
            }
        }
        this.countDownLabel.text = count + "";
    };
    p.stopCountDown = function () {
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.countDownTimer.stop();
    };
    p.startGame = function () {
        this.stopCountDown();
        this.sendStartGame();
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    p.revLock = function (data) {
        console.log("revLock:", data);
        var openid = data.openid;
        this.lockNum++;
        if (this.parent) {
            if (GameConst.debug) {
                this.startGame();
            }
            else {
                //所有人校准完成
                var len = UserManager.getInstance().getUserNum();
                if (this.lockNum >= len) {
                    this.startGame();
                }
            }
        }
    };
    //发送开始游戏
    p.sendStartGame = function () {
        console.log("sendStartGame");
        this.socket.sendMessage("startGame");
    };
    return LockScene;
}(BaseScene));
egret.registerClass(LockScene,'LockScene');
