/**
 * 游戏管理类
 * @author  陈凯
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
        this.resultScene = new ResultScene(); //结果场景
    }
    var d = __define,c=GameManager,p=c.prototype;
    //启动游戏框架
    p.startup = function (main) {
        //获取配置信息
        GameConst.gameConfig = window["gameConfig"];
        GameConst.debug = GameConst.gameConfig.debug;
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        //配置socket
        var socket = ClientSocket.getInstance();
        socket.homeScene = this.homeScene;
        socket.gameScene = this.gameScene;
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
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
