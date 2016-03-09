/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.socket = ClientSocket.getInstance();
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        this.createQRCode();
        this.sendLogin();
    };
    p.onRemove = function () {
    };
    p.createQRCode = function () {
        var codeLoader = new QRCodeLoader();
        codeLoader.load(window["dataUrl"], window["codeWidth"], window["codeHeight"], window["logoUrl"]);
        codeLoader.x = (GameConst.stage.stageWidth - window["codeWidth"]) / 2;
        codeLoader.y = (GameConst.stage.stageHeight - window["codeHeight"]) / 2;
        this.addChild(codeLoader);
    };
    p.sendLogin = function () {
        var rid = window["rid"];
        this.socket.sendMessage("login", { rid: rid, userType: "pc" }, this.revLogin, this);
    };
    p.revLogin = function (data) {
        var success = data.success;
        egret.log("rev login:", success);
    };
    p.revUserJoin = function () {
        egret.log("rev userJoin");
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
