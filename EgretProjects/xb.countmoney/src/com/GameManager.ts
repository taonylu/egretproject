/**
 * 游戏管理类
 * @author 
 *
 */
class GameManager {
    public gameScene: GameScene = new GameScene();  //游戏场景
    public shareUI:ShareUI = new ShareUI();         //分享UI
    
    public startup(main:Main): void {
        //初始化配置
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
        //跳转场景
        LayerManager.getInstance().runScene(this.gameScene);
    }
    
    
    

    
    
    
    private static instance: GameManager;
    public static getInstance(): GameManager {
        if(this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
}
