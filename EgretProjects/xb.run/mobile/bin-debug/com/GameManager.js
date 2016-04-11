/**
 * 游戏管理类
 * @author  陈凯
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.lockScene = new LockScene(); //校准场景
        this.gameScene = new GameScene(); //游戏场景
        this.resultScene = new ResultScene(); //结果场景
    }
    var d = __define,c=GameManager,p=c.prototype;
    //启动游戏框架
    p.startup = function (main) {
        //配置其他信息
        GameConst.gameConfig = window["gameConfig"];
        GameConst.debug = GameConst.gameConfig.debug;
        GameConst.stage = main.stage;
        //配置Layer
        LayerManager.getInstance().initialize(main);
        //启动Socket
        this.socket = ClientSocket.getInstance();
        this.socket.gameManager = this;
        this.socket.lockScene = this.lockScene;
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
        var gameConfig = GameConst.gameConfig;
        var json = {
            rid: gameConfig.rid,
            openid: gameConfig.openid,
            headimgurl: gameConfig.headimgurl,
            nickname: gameConfig.nickname,
        };
        egret.log("send login:", "rid:", json.rid, "openid:", json.openid);
        this.socket.sendMessage("login", json, this.revLogin, this);
    };
    //接收登录
    p.revLogin = function (data) {
        egret.log("rev login");
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
        this.preloadScene.parent && this.preloadScene.parent.removeChild(this.preloadScene);
        this.preloadScene = null;
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
