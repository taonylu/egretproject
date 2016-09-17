/**
 * 游戏管理类
 * @author
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
        this.luckScene = new LuckScene(); //抽奖场景
        this.resultScene = new ResultScene(); //结果场景
    }
    var d = __define,c=GameManager,p=c.prototype;
    p.startup = function (main) {
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        LayerManager.getInstance().runScene(this.homeScene);
        //获取用户数据
        //window['getUserData']();
        //设置js回调
        window['gameScene'] = this.gameScene;
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
