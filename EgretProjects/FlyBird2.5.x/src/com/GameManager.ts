/**
 * 游戏主类
 * @author 羊力大仙 
 * @date 2015.10.27
 */
class GameManager {
	
    public homeScene: HomeScene = new HomeScene();
    public gameScene: GameScene = new GameScene();

    public greenBar:GreenBarMC;

    public startup():void{
        LayerManager.getInstance().runScene(this.homeScene);
        this.createGreenBar();
    }


    private createGreenBar():void{
        var stage:egret.Stage = LayerManager.getInstance().stage;
        this.greenBar = new GreenBarMC();
        this.greenBar.x = 0;
        this.greenBar.y = stage.stageHeight - this.greenBar.height;
        this.greenBar.play(-1);
        LayerManager.getInstance().popLayer.addChild(this.greenBar);
    }

    private static instance:GameManager;
    public static getInstance():GameManager{
        if(this.instance == null){
            this.instance = new GameManager();
        }
        return this.instance;
    }
}
