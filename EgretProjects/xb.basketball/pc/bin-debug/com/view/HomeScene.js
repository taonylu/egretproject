/**
 * 主页场景
 * 二维码显示页面
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.codeLoader = new QRCodeLoader(); //二维码
        this.socket = ClientSocket.getInstance(); //Socket
        this.soundManager = SoundManager.getInstance();
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.handPosY = this.hand.y;
        this.ballPosX = this.ball.x;
        this.ballPosY = this.ball.y;
        //初始化篮球弧度动画
        var p0 = new egret.Point(this.ballPosX, this.ballPosY);
        var p1 = new egret.Point(this.ballPosX - 60, this.ballPosY - 480);
        var p2 = new egret.Point(this.ballPosX - 165, this.ballPosY - 250);
        this.arc = new ArcMotion(this.ball, p0, p1, p2, 1500, true);
    };
    p.onEnable = function () {
        this.soundManager.playBgm(this.soundManager.bgm_home);
        this.createQRCode();
        this.submitRid();
        this.shootAnim();
    };
    p.onRemove = function () {
        this.stopShootAnim();
        this.codeLoader.destroy();
    };
    p.createQRCode = function () {
        //随机rid，当前时间加上随机6位数验证码
        this.rid = (new Date()).getTime() + NumberTool.getVerificationCode(6);
        //index创建二维码图片
        window["createQRCode"](this.rid);
        //加载二维码图片
        var dataUrl = window["dataUrl"];
        var codeWidth = window["codeWidth"];
        var codeHeight = window["codeHeight"];
        var logoUrl = window["logoUrl"];
        this.codeLoader.load(dataUrl, codeWidth, codeHeight, logoUrl);
        this.codeGroup.addChild(this.codeLoader);
    };
    p.shootAnim = function () {
        egret.Tween.get(this.hand, { loop: true }).to({ y: this.handPosY - 50 }, 300).to({ y: this.handPosY }, 300).wait(900);
        this.arc.play();
    };
    p.stopShootAnim = function () {
        this.arc.stop();
        egret.Tween.removeTweens(this.hand);
        this.ball.x = this.ballPosX;
        this.ball.y = this.ballPosY;
        this.hand.y = this.handPosY;
    };
    ///////////////////////////////////////////
    //----------------[发送数据]---------------
    ///////////////////////////////////////////
    //提交房间号
    p.submitRid = function () {
        if (this.socket.isConnected()) {
            var json = { "rid": this.rid };
            this.socket.sendMessage("submitRid", json, this.revSubmitRid, this);
        }
        if (GameConst.isDebug) {
            this.revSubmitRid({ bSuccess: true, msg: "房间已存在" });
            this.revStartGame();
        }
    };
    ///////////////////////////////////////////
    //----------------[接收数据]---------------
    ///////////////////////////////////////////
    //接收房间号是否正确
    p.revSubmitRid = function (data) {
        var bSuccess = data.bSuccess;
        var msg = data.msg;
        egret.log("revSubmitRid:", bSuccess, msg);
        if (bSuccess) {
        }
        else {
            GameManager.getInstance().messageBox.showMessage(msg);
        }
    };
    //接收开始游戏
    p.revStartGame = function () {
        egret.log("rev startGame");
        var gameScene = GameManager.getInstance().gameScene;
        if (!gameScene.parent) {
            LayerManager.getInstance().runScene(gameScene);
        }
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
