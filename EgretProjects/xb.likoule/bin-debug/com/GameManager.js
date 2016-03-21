/**
 * 游戏管理类
 * @author  陈凯
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
        this.rulePanel = new RulePanel(); //游戏规则
        this.prizePanel = new PrizePanel(); //获奖名单
        this.rankPanle = new RankPanel(); //排行榜
        this.teamForm = new TeamForm(); //创建团队
        this.sharePanel = new SharePanel(); //分享
    }
    var d = __define,c=GameManager,p=c.prototype;
    //启动游戏框架
    p.startup = function (main) {
        //配置全局变量
        GameConst.csrf = window["_csrf"];
        //配置微信
        WeiXin.start();
        //配置重力感应
        window["GM"] = this;
        //获取配置文件
        GameConst.config = RES.getRes("config_json");
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
    };
    p.onOrientation = function (orientation) {
        //重力感应  0竖屏 90 -90横屏
        egret.log(orientation);
        GameConst.orientation = orientation;
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
