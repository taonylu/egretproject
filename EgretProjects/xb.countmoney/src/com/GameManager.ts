/**
 * 游戏管理类
 * @author 
 *
 */
class GameManager {
    public homeScene:HomeScene = new HomeScene();     //主页场景
    public gameScene: GameScene = new GameScene();    //游戏场景
    public openScene:OpenScene = new OpenScene();     //打开红包场景
    public shareUI:ShareUI = new ShareUI();           //分享UI
    public myPrizeUI:MyPrizeUI = new MyPrizeUI();     //我的奖品
    public ruleUI: RuleUI = new RuleUI();            //领奖须知
    
    public startup(main:Main): void {
        
        
        //初始化配置
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
        window['openScene'] = this.openScene;
        
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
    }
    
    
    

    
    
    
    private static instance: GameManager;
    public static getInstance(): GameManager {
        if(this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
}
