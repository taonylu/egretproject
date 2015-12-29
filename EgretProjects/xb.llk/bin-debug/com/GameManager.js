/**
 * 游戏管理类
 * @author
 *
 */
var GameManager = (function () {
    function GameManager() {
    }
    var d = __define,c=GameManager,p=c.prototype;
    p.startup = function (main) {
        //判断PC或者手机
        this.isMobile = egret.Capabilities.isMobile;
        if (this.isMobile) {
            main.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            main.stage.orientation = egret.OrientationMode.PORTRAIT;
            main.stage.setContentSize(450, 800);
            this.homeScene = new HomeScene("HomeSceneSkin");
            this.gameScene = new GameScene();
        }
        else {
            main.stage.setContentSize(800, 450);
            main.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            main.stage.orientation = egret.OrientationMode.LANDSCAPE;
            this.homeScene = new HomeScene("PCHomeSceneSkin");
            this.gameScene = new GameScene();
        }
        //配置socket
        var socket = new ClientSocket();
        socket.homeScene = this.homeScene;
        socket.gameScene = this.gameScene;
        socket.startConnect(NetConst.url);
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
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
})();
egret.registerClass(GameManager,'GameManager');
