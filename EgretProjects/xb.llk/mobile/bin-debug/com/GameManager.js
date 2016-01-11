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
        var socket = new ClientSocket();
        socket.homeScene = this.homeScene;
        socket.gameScene = this.gameScene;
        this.homeScene.socket = socket;
        this.gameScene.socket = socket;
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
        //连接socket
        //socket.startConnect(NetConst.url);
        //模拟数据
        //        var json = { "mapdata": []};
        //        json.mapdata = [
        //            [1,0,0,0,1,0,1],
        //            [0,0,1,0,0,1,0],
        //            [0,0,1,0,0,0,1],
        //            [1,0,0,1,0,1,1],
        //            [0,0,1,0,0,0,0],
        //            [1,0,0,0,0,0,0],
        //            [0,0,0,0,0,1,0],
        //            [1,0,0,1,0,0,0]
        //        ];
        //        this.homeScene.revMapData(json);
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
