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
        this.startConnect();
    };
    p.onRemove = function () {
    };
    //开始连接socket
    p.startConnect = function () {
        if (this.socket.isConnected() == false) {
            this.socket.startConnect();
        }
    };
    //连接成功
    p.connect = function () {
        this.sendLogin();
    };
    //发送登录请求
    p.sendLogin = function () {
        egret.log("send login");
        var gameConfig = GameConst.gameConfig;
        var json = {
            rid: gameConfig.rid,
            openid: gameConfig.openid,
            headimgurl: gameConfig.headimgurl,
            nickname: gameConfig.nickname,
            userType: "mobile"
        };
        this.socket.sendMessage("login", json, this.revLogin, this);
    };
    //接收登录
    p.revLogin = function (data) {
        var success = data.success;
        var msg = data.msg;
        egret.log("rev login:", " success:", success, " msg:", msg);
    };
    //接收游戏开始
    p.revStartGame = function () {
        egret.log("rev startGame");
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
