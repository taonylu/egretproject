/**
 *
 * @author 
 * 游戏管理类
 */
class GameManager {
    public homeScene: HomeScene ;
    public roleScene: RoleScene;
    public introduceScene: IntroduceScene;
    public gameScene: GameScene;
    public loseScene:LoseScene;
    public winScene: WinScene;
    
	public constructor() {
        this.homeScene = new HomeScene();
        this.roleScene = new RoleScene();
        this.introduceScene = new IntroduceScene();
        this.gameScene = new GameScene();
        this.loseScene = new LoseScene();
        this.winScene = new WinScene();
	}
	
	//启动游戏
    public startup(): void {
        LayerManager.getInstance().runScene(this.homeScene);
    }
	
    private static instance;
    
    public static getInstance(): GameManager {
        if(this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
}
