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
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        this.createQRCode();
        this.submitRid();
    };
    p.onRemove = function () {
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
        this.codeLoader.x = (GameConst.stage.stageWidth - codeWidth) / 2;
        this.codeLoader.y = (GameConst.stage.stageHeight - codeHeight) / 2;
        this.addChild(this.codeLoader);
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
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
