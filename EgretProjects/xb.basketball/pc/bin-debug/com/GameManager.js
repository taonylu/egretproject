/**
 * 游戏管理类
 * @author  陈凯
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
        this.socket = ClientSocket.getInstance();
    }
    var d = __define,c=GameManager,p=c.prototype;
    GameManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    };
    //启动游戏框架
    p.startup = function (main) {
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
        //配置socket
        //this.socket.startConnect();
    };
    ///////////////////////////////////////////
    //----------------[发送数据]---------------
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    //----------------[接收数据]---------------
    ///////////////////////////////////////////
    //链接成功
    p.onConnect = function () {
        //提交房间号
        this.homeScene.submitRid();
    };
    //断开链接
    p.onDisconnect = function () {
    };
    p.onError = function () {
    };
    return GameManager;
})();
egret.registerClass(GameManager,'GameManager');