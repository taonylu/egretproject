/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.countDownTimer = new egret.Timer(1000); //倒计时
        this.countDownLimit = 1; //倒计时限制
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
    };
    p.onEnable = function () {
        this.socket.startConnect();
        this.introduce();
        if (GameConst.isDebug) {
            this.revLogin({ bSuccess: true, msg: "" });
        }
    };
    p.onRemove = function () {
    };
    //开始游戏
    p.startGame = function () {
        this.ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onTouchBegin = function (e) {
        this.ball.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onTouchMove = function (e) {
        this.ball.x = e.stageX;
        this.ball.y = e.stageY;
        console.log(this.ball.y, e.stageY);
    };
    p.onTouchEnd = function (e) {
    };
    //介绍界面
    p.introduce = function () {
        this.tipLabel.visible = true;
        this.hand.visible = true;
        this.ball.visible = true;
        var handPos = this.hand.y;
        egret.Tween.get(this.hand, { loop: true }).to({ y: handPos - 50 }, 500).to({ y: handPos }, 500);
        GameManager.getInstance().messageBox.showMessage("建议在wifi下进行游戏");
    };
    //开始倒计时
    p.startCountDown = function () {
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
        var messageBox = GameManager.getInstance().messageBox;
        messageBox.setFontSize(50);
        messageBox.showMessage(this.countDownLimit + "");
    };
    //倒计时处理
    p.onCountDownHandler = function () {
        var count = this.countDownLimit - this.countDownTimer.currentCount;
        if (count > 0) {
            GameManager.getInstance().messageBox.showMessage(count + "");
        }
        else {
            //停止计时
            this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
            this.countDownTimer.stop();
            //隐藏组件
            egret.Tween.removeTweens(this.hand);
            this.hand.visible = false;
            GameManager.getInstance().messageBox.hide();
            //开始游戏
            this.startGame();
        }
    };
    //////////////////////////////////////////////////////
    /////////////////   网络连接     //////////////////////
    //////////////////////////////////////////////////////
    //连接成功
    p.onConnect = function () {
        var json = { rid: egret.getOption("rid") };
        this.socket.sendMessage("login", json, this.revLogin, this);
        egret.log("发送登录请求:" + json);
    };
    //连接失败
    p.onError = function (data) {
        GameManager.getInstance().messageBox.showMessage("连接服务器失败");
    };
    //连接断开
    p.onDisconnect = function () {
        GameManager.getInstance().messageBox.showMessage("与网页断开连接");
    };
    //////////////////////////////////////////////////////
    //---------------------[接收数据]----------------------
    //////////////////////////////////////////////////////
    //接收登录结果
    p.revLogin = function (data) {
        var bSuccess = data.bSuccess;
        var msg = data.msg;
        egret.log("接收登录结果:", bSuccess, msg);
        if (bSuccess) {
            this.startCountDown();
        }
        else {
            GameManager.getInstance().messageBox.showMessage(msg);
        }
    };
    //接收游戏结束
    p.revGameOver = function (data) {
        var score = data.score;
        egret.log("接收游戏结束:", score);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
