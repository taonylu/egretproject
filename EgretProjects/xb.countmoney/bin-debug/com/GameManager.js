/**
 * 游戏管理类
 * @author
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
        this.openScene = new OpenScene(); //打开红包场景
        this.shareUI = new ShareUI(); //分享UI
        this.myPrizeUI = new MyPrizeUI(); //我的奖品
        this.ruleUI = new RuleUI(); //领奖须知
    }
    var d = __define,c=GameManager,p=c.prototype;
    p.startup = function (main) {
        //初始化配置
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        window['openScene'] = this.openScene;
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
