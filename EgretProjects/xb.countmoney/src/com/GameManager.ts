/**
 * 游戏管理类
 * @author 
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();
    public gameScene: GameScene = new GameScene();
    
    
    public startup(main:Main): void {
        //初始化配置
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
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
