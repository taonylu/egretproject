/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    ////////////////////////////////////////////////////////////
    //------------------------[Socket通讯]----------------------
    ////////////////////////////////////////////////////////////
    //发送登录
    p.sendLogin = function () {
        var rid = window["gameConfig"].rid;
        egret.log("send login:", rid, "userType:mobile");
        this.socket.sendMessage("login", { rid: "1", userType: "mobile" }, this.revLogin, this);
        if (GameConst.debug) {
            LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
        }
    };
    //接收登录
    p.revLogin = function (data) {
        egret.log("rev login1");
        var success = data.success;
        var msg = data.msg;
        if (success) {
        }
        else {
        }
    };
    //接收开始校准
    p.revStartLock = function () {
        egret.log("revStartLock");
        //TODO 显示校准按钮,校准后开始游戏
        //LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);  
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
