/**
 * 游戏管理类
 * @author
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.gameScene = new GameScene(); //游戏场景
        this.shareUI = new ShareUI(); //分享UI
    }
    var d = __define,c=GameManager,p=c.prototype;
    p.startup = function (main) {
        //初始化配置
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        //跳转场景
        LayerManager.getInstance().runScene(this.gameScene);
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
