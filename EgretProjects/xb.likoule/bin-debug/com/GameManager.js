/**
 * 游戏管理类
 * @author  陈凯
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
        this.resultScene = new ResultScene(); //结算页面
        this.rulePanel = new RulePanel(); //游戏规则
        this.prizePanel = new PrizePanel(); //获奖名单
        this.rankPanel = new RankPanel(); //排行榜
        this.teamForm = new TeamForm(); //创建团队
        this.sharePanel = new SharePanel(); //分享
        this.myTeamPanel = new MyTeamPanel(); //我的团队
        this.luckForm = new LuckForm(); //中奖页面
    }
    var d = __define,c=GameManager,p=c.prototype;
    //启动游戏框架
    p.startup = function (main) {
        //配置全局变量
        GameConst.csrf = window["csrf"]; //验证码
        GameConst.myName = window["nickName"]; //我自己名字
        egret.log("myName:", GameConst.myName);
        //是否被邀请组队
        if (GameConst.debug) {
            GameConst.invitInfo.isInvit = 1;
            GameConst.invitInfo.nickName = "XXXX";
            GameConst.invitInfo.teamName = "XXXX";
        }
        else {
            //TODO获取实际参数
            GameConst.invitInfo = window["invitInfo"];
        }
        egret.log("invitInfo:", GameConst.invitInfo.isInvit, GameConst.invitInfo.nickName, GameConst.invitInfo.teamName);
        //配置重力感应
        window["GM"] = this;
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
        if (this.resultScene.parent) {
            this.resultScene.showCode();
        }
        if (this.sharePanel.parent) {
            this.sharePanel.onEnable();
        }
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
