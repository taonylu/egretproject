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
        this.countDownLimit = 1;
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
    };
    p.onEnable = function () {
        this.createQRCode(); //创建二维码
        this.startConnect(); //连接socket
    };
    p.onRemove = function () {
    };
    //开始游戏
    p.startGame = function () {
        this.sendStartGame();
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
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
    //创建二维码
    p.createQRCode = function () {
        this.rid = window["createQRCode"]();
        var codeLoader = new QRCodeLoader();
        var codeConfig = window["codeConfig"];
        codeLoader.load(codeConfig.codeData, codeConfig.codeWidth, codeConfig.codeHeight, codeConfig.logoUrl);
        this.codeGroup.addChild(codeLoader);
        this.sendUpRid();
    };
    //开始连接socket
    p.startConnect = function () {
        if (this.socket.isConnected() == false) {
            this.socket.startConnect();
        }
    };
    //socket连接成功
    p.connect = function () {
        this.sendLogin();
    };
    //发送登录请求
    p.sendLogin = function () {
        console.log("send login:", "rid=" + this.rid);
        this.socket.sendMessage("login", { rid: this.rid, userType: "pc" }, this.revLogin, this);
    };
    //接收登录
    p.revLogin = function (data) {
        var success = data.success;
        var msg = data.msg;
        console.log("rev login:", data);
    };
    //更新房间号，第一次进入homeScene时，socket尚未连接，所以并不会发送upRid，房间号在登录请求login中发送
    p.sendUpRid = function () {
        console.log("send upRid:", "rid=" + this.rid);
        this.socket.sendMessage("upRid", { rid: this.rid });
    };
    //发送游戏开始
    p.sendStartGame = function () {
        console.log("send startGame");
        this.socket.sendMessage("startGame");
    };
    //接收用户加入
    p.revUserJoin = function (data) {
        console.log("rev userJoin:", data);
        var openid = data.openid;
        var headimgurl = data.headimgurl;
        var nickname = data.nickname;
        //保存用户列表
        var userVO = new UserVO();
        userVO.openid = openid;
        userVO.headimgurl = headimgurl;
        userVO.nickname = nickname;
        UserManager.getInstance().addUser(userVO);
        //开始倒计时
        this.startCountDown();
    };
    //接收用户离开
    p.revUserQuit = function (data) {
        console.log("rev userQuit:", data);
        var openid = data.openid;
        //从用户列表中删除
        UserManager.getInstance().deleteUser(openid);
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
