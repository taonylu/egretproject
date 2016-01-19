/**
 * 游戏管理类,单例类
 * @author  陈凯
 *
 */
var GameManager = (function () {
    function GameManager() {
        //=============[场景]================
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
    }
    var d = __define,c=GameManager,p=c.prototype;
    //启动游戏框架
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
        //创建弹幕层
        this.barrageUI = new BarrageUI();
        LayerManager.getInstance().popLayer.addChild(this.barrageUI);
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
        //链接socket
        this.socket.startConnect(window["server"]);
    };
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    //==================[接收数据]=================
    //连接成功
    p.onConnect = function () {
        this.sendLoginRequest();
    };
    //接收弹幕
    p.revBarrage = function (data) {
        this.barrageUI.showOneMsg(data);
    };
    //=================[发送数据]=====================
    //发送登录请求
    p.sendLoginRequest = function () {
        var json = { "rid": window["srvConfig"].rid };
        this.socket.sendMessage(NetConst.C2S_login, json, this.homeScene.revLogin, this.homeScene);
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
