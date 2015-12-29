/**
 * 游戏管理类
 * @author 
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();       //主页场景
    public gameScene: GameScene = new GameScene();       //游戏场景
    public luckScene: LuckScene = new LuckScene();       //抽奖场景
    public resultScene: ResultScene = new ResultScene(); //结果场景
    
    public startup(main: Main): void {
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        LayerManager.getInstance().runScene(this.homeScene); 
        
        //获取用户数据
        //window['getUserData']();
        //设置js回调
        window['gameScene'] = this.gameScene;
    }
    
    
    private static instance: GameManager;
    public static getInstance(): GameManager {
        if(this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
}
