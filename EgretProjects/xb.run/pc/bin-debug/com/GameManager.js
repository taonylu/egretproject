/**
 * 游戏管理类
 * @author  陈凯
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
        this.lockScene = new LockScene(); //校准场景
    }
    var d = __define,c=GameManager,p=c.prototype;
    //启动游戏框架
    p.startup = function (main) {
        //配置Layer
        GameConst.stage = main.stage;
        GameConst.debug = window["gameConfig"].debug;
        LayerManager.getInstance().initialize(main);
        //显示主页
        LayerManager.getInstance().runScene(this.homeScene);
        //配置Socket
        var socket = ClientSocket.getInstance();
        socket.gameManager = this;
        socket.homeScene = this.homeScene;
        socket.gameScene = this.gameScene;
        socket.lockScene = this.lockScene;
        socket.startConnect();
    };
    p.connect = function () {
        this.homeScene.sendLogin();
    };
    p.disconnect = function () {
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
