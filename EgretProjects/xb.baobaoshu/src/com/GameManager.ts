/**
 * 游戏主类，单例
 * @author 
 *
 */
class GameManager {
    public preloadScene: PreloadScene = new PreloadScene();
    public gameScene: GameScene = new GameScene();
    public submitScene: SubmitScene = new SubmitScene();
    
	public constructor() {
    	
	}
	
	//启动
    public startup(main:Main): void {
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        LayerManager.getInstance().runScene(this.gameScene);
        
        console.log("submit");
        
        //Test 测试
        window['submit']();
        
        egret.Tween.get(this).wait(3000).call(function() {
            window['sendGetPrize']();
        });
        
    }
	

    private static instance: GameManager;
    public static getInstance(): GameManager {
        if(this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
}
