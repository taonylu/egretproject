/**
 * 游戏管理类
 * @author  陈凯
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();  //主页场景
    public gameScene: GameScene = new GameScene();  //游戏场景
    public rulePanel: RulePanel = new RulePanel();   //游戏规则
    public prizePanel:PrizePanel = new PrizePanel(); //获奖名单
    public rankPanle:RankPanel = new RankPanel();    //排行榜
    public teamForm: TeamForm = new TeamForm(); //创建团队
    public sharePanel:SharePanel = new SharePanel(); //分享
    
    //启动游戏框架
    public startup(main: Main): void {
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
        
    }
    
    public onOrientation(orientation){
        //重力感应  0竖屏 90 -90横屏
        egret.log(orientation);
        GameConst.orientation = orientation;
        
    }
    
    //获取单例
    private static instance: GameManager;
    public static getInstance(): GameManager {
        if(this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
}
