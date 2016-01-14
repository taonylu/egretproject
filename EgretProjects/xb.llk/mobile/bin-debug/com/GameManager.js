/**
 * 游戏管理类
 * @author
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
    }
    var d = __define,c=GameManager,p=c.prototype;
    p.startup = function (main) {
        //配置socket
        this.socket = new ClientSocket();
        this.socket.homeScene = this.homeScene;
        this.socket.gameScene = this.gameScene;
        this.homeScene.socket = this.socket;
        this.gameScene.socket = this.socket;
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
        //连接socket
        this.socket.startConnect(window["server"]);
    };
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    //--------------------[接收]----------------------
    //链接成功
    p.onConnect = function () {
        this.sendLogin();
    };
    //接收登录
    p.revLogin = function (data) {
        var status = data;
        egret.log("接收登录:" + status);
    };
    //--------------------[发送]----------------------
    //发送登录
    p.sendLogin = function () {
        var json = { "uid": window["srvConfig"].uid, "rid": window["srvConfig"].rid };
        this.socket.sendMessage(NetConst.C2S_login, json, this.revLogin, this);
    };
    GameManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    };
    return GameManager;
})();
egret.registerClass(GameManager,'GameManager');
