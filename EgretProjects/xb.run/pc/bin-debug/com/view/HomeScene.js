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
    //发送登录
    p.sendLogin = function () {
        egret.log("sendLogin：", this.rid);
        var rid = this.rid;
        this.socket.sendMessage("login", { rid: rid, userType: "pc" }, this.revLogin, this);
    };
    //接收登录
    p.revLogin = function (data) {
        var success = data.success;
        egret.log("rev login:", success);
    };
    //接收用户进入
    p.revUserJoin = function () {
        egret.log("rev userJoin");
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
