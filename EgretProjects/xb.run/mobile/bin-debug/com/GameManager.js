/**
 * 游戏管理类
 * @author  陈凯
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.lockScene = new LockScene(); //校准场景
        this.gameScene = new GameScene(); //游戏场景
    }
    var d = __define,c=GameManager,p=c.prototype;
    //启动游戏框架
    p.startup = function (main) {
        //配置其他信息
        GameConst.debug = window["gameConfig"].debug;
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        //启动Socket
        this.socket = ClientSocket.getInstance();
        this.socket.gameManager = this;
        this.socket.homeScene = this.homeScene;
        this.socket.gameScene = this.gameScene;
        this.socket.startConnect();
    };
    //------------------------【socket事件】-------------------------
    p.connect = function () {
        this.sendLogin();
    };
    p.disconnect = function () {
    };
    //发送登录
    p.sendLogin = function () {
        var rid = window["gameConfig"].rid;
        egret.log("send login:", rid, "userType:mobile");
        this.socket.sendMessage("login", { rid: rid, userType: "mobile" }, this.revLogin, this);
    };
    //接收登录
    p.revLogin = function (data) {
        egret.log("rev login1");
        var success = data.success;
        var msg = data.msg;
        if (success) {
        }
        else {
            alert(msg);
        }
    };
    //接收开始校准
    p.revStartLock = function () {
        egret.log("revStartLock");
        LayerManager.getInstance().runScene(GameManager.getInstance().lockScene);
    };
    GameManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    };
    return GameManager;
}());
egret.registerClass(GameManager,'GameManager');
