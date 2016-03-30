/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.codeLoader = new QRCodeLoader(); //二维码
        this.countDownTimer = new egret.Timer(1000); //倒计时计时器
        this.countDownLimit = 20; //倒计时限制
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
        this.createQRCode();
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    //生成二维码
    p.createQRCode = function () {
        //随机房间号
        this.rid = (new Date()).getTime() + NumberTool.getVerificationCode(6);
        //index创建二维码图片
        window["createQRCode"](this.rid);
        //加载二维码图片
        var codeLoader = new QRCodeLoader();
        var gameConfig = window["gameConfig"];
        codeLoader.load(gameConfig.codeData, gameConfig.codeWidth, gameConfig.codeHeight, gameConfig.logoUrl);
        codeLoader.x = (GameConst.stage.stageWidth - gameConfig.codeWidth) / 2;
        codeLoader.y = (GameConst.stage.stageHeight - gameConfig.codeHeight) / 2;
        this.addChild(codeLoader);
    };
    p.startCountDown = function () {
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    };
    p.onCountDownHandler = function () {
        var count = this.countDownLimit - this.countDownTimer.currentCount;
        //倒计时结束，开始校准
        if (count < 0) {
            this.countDownTimer.stop();
            this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
            this.sendStartLock();
        }
    };
    /////////////////////////////////////////////////////////
    //-----------------[Socket 数据]-------------------------
    /////////////////////////////////////////////////////////
    //发送登录
    p.sendLogin = function () {
        egret.log("sendLogin：", this.rid);
        var rid = this.rid;
        this.socket.sendMessage("login", { rid: rid, userType: "pc" }, this.revLogin, this);
    };
    //接收登录
    p.revLogin = function (data) {
        egret.log("rev login:", data);
        var success = data.success;
        var msg = data.msg;
        if (success) {
        }
        else {
        }
    };
    //接收用户进入
    p.revUserJoin = function (data) {
        egret.log("rev userJoin:", data);
        if (GameConst.debug) {
            this.sendStartLock();
            LayerManager.getInstance().runScene(GameManager.getInstance().lockScene);
        }
        else {
        }
    };
    //用户离开
    p.revUserQuit = function (data) {
        egret.log("rev userQuit:", data);
        //TODO 删除用户
    };
    //发送开始校准
    p.sendStartLock = function () {
        egret.log("sendStartLock");
        this.socket.sendMessage("startLock");
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
