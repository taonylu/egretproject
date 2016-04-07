/**
 * 游戏管理类
 * @author  陈凯
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
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
        //显示首页
        LayerManager.getInstance().runScene(this.gameScene);
        //启动Socket
        this.socket = ClientSocket.getInstance();
        this.socket.gameManager = this;
        this.socket.homeScene = this.homeScene;
        this.socket.gameScene = this.gameScene;
        //this.socket.startConnect();
    };
    //------------------------【socket事件】-------------------------
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
