/**
 * 游戏管理类
 * @author  陈凯
 *
 */
class GameManager {
    public preloadScene:PreloadScene;               //预加载场景
    public homeScene: HomeScene = new HomeScene();  //主页场景
    public gameScene: GameScene = new GameScene();  //游戏场景
    public resultScene: ResultScene = new ResultScene(); //结果场景
    public gameLoseScene:GameLoseScene = new GameLoseScene();  //游戏失败场景
    public submitScene:SubmitScene = new SubmitScene();   //提交场景
    
    public shareUI:ShareUI = new ShareUI();  //分享UI
    public ruleUI:RuleUI = new RuleUI();  //规则UI
    
    //启动游戏框架
    public startup(main: Main): void {
        
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);  
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
