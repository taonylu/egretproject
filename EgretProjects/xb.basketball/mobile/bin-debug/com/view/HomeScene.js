/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.resultPanel = new ResultPanel(); //结算面板
        this.countDownTimer = new egret.Timer(650); //倒计时
        this.countDownLimit = 3; //倒计时限制
        this.logoLoader = new ImageLoad();
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.ballX = this.ball.x;
        this.ballY = this.ball.y;
        this.socket = ClientSocket.getInstance();
        this.socket.homeScene = this;
    };
    p.onEnable = function () {
        this.loadLogo();
        this.socket.startConnect();
        this.introduce();
        if (GameConst.isDebug) {
            this.revLogin({ bSuccess: true, msg: "" });
        }
    };
    p.onRemove = function () {
    };
    p.loadLogo = function () {
        if (this.logoLoader.isEmpty()) {
            this.logoGroup.addChild(this.logoLoader);
            this.logoLoader.loadImg(window["logoUrl"]);
        }
    };
    //开始游戏
    p.startGame = function () {
        this.configListeners();
        if (GameConst.isDebug) {
            this.revGameOver({ score: 100 });
        }
    };
    //游戏结束
    p.gameOver = function () {
        egret.Tween.removeTweens(this.ball);
        this.ball.x = this.ballX;
        this.ball.y = this.ballY;
        this.deConfigListeners();
    };
    p.configListeners = function () {
        this.ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.deConfigListeners = function () {
        this.ball.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onTouchBegin = function (e) {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.startX = e.stageX;
        this.startY = e.stageY;
    };
    p.onTouchEnd = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.endX = e.stageX;
        this.endY = e.stageY;
        if ((this.startY - this.endY) > 25) {
            var radian = Math.atan2(this.endY - this.startY, this.endX - this.startX);
            //投球动画
            this.deConfigListeners();
            var self = this;
            var posX = Math.cos(radian) * 1000;
            var posY = Math.sin(radian) * 1000;
            egret.Tween.get(this.ball).to({ x: this.ballX + posX, y: this.ballY + posY }, 300).call(function () {
                self.configListeners();
                self.ball.x = self.ballX;
                self.ball.y = self.ballY;
            });
            //发送投球
            this.sendShoot(radian);
        }
    };
    //介绍界面
    p.introduce = function () {
        this.tipLabel.visible = true;
        this.hand.visible = true;
        this.ball.visible = true;
        var handPos = this.hand.y;
        egret.Tween.get(this.hand, { loop: true }).to({ y: handPos - 50 }, 500).to({ y: handPos }, 500);
        GameManager.getInstance().messageBox.showMessage("在wifi下游戏更流畅");
    };
    //开始倒计时
    p.startCountDown = function () {
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
        var messageBox = GameManager.getInstance().messageBox;
        messageBox.showMessage(this.countDownLimit + "", 50);
    };
    //倒计时处理
    p.onCountDownHandler = function () {
        var count = this.countDownLimit - this.countDownTimer.currentCount;
        if (count > 0) {
            GameManager.getInstance().messageBox.showMessage(count + "", 50);
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
        this.sendLogin();
    };
    //连接失败
    p.onError = function (data) {
        GameManager.getInstance().messageBox.showMessage("连接服务器失败");
    };
    //连接断开
    p.onDisconnect = function () {
        //游戏结算后，不显示断开连接
        if (!this.resultPanel.parent) {
            GameManager.getInstance().messageBox.showMessage("网页连接已断开");
        }
    };
    //////////////////////////////////////////////////////
    //---------------------[发送数据]----------------------
    //////////////////////////////////////////////////////
    //发送登录
    p.sendLogin = function () {
        var json = { "rid": egret.getOption("rid") };
        this.socket.sendMessage("login", json, this.revLogin, this);
        egret.log("发送登录请求:" + json.rid);
    };
    p.sendShoot = function (angle) {
        this.socket.sendMessage("shoot", { "angle": parseFloat(angle.toFixed(2)) }); //弧度
        egret.log("shoot angle:", parseFloat(angle.toFixed(2)));
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
        this.gameOver();
        //显示分数
        if (score >= window["prizeScore"]) {
            this.prizeGroup.visible = true;
            this.messageLabel.text = "恭喜获得优惠券一张\n赶紧点击按钮领取吧";
            this.prizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                location.href = window["prizeLink"];
            }, this);
        }
        else {
            this.resultPanel.showScore(score);
            this.resultPanel.x = (GameConst.stage.stageWidth - this.resultPanel.width) / 2;
            this.resultPanel.y = (GameConst.stage.stageHeight - this.resultPanel.height) / 2;
            this.addChild(this.resultPanel);
        }
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
