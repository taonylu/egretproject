/**
 * 游戏管理类
 * @author 
 *
 */
class GameManager {
    public homeScene: HomeScene;           //主页场景
    public gameScene: GameScene;           //游戏场景
    
    public isMobile: Boolean;              //手机环境
    
    public startup(main: Main): void {
        //判断PC或者手机
        this.isMobile = egret.Capabilities.isMobile;
        if(this.isMobile) {
            main.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            main.stage.orientation = egret.OrientationMode.PORTRAIT;
            main.stage.setContentSize(450,800);
            this.homeScene = new HomeScene("HomeSceneSkin");
            this.gameScene = new GameScene();
        } else {
            main.stage.setContentSize(800,450);
            main.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            main.stage.orientation = egret.OrientationMode.LANDSCAPE;
            this.homeScene = new HomeScene("PCHomeSceneSkin");
            this.gameScene = new GameScene();
        }

        //配置socket
        var socket:ClientSocket = new ClientSocket();
        socket.homeScene = this.homeScene;
        socket.gameScene = this.gameScene;
        socket.startConnect(NetConst.url);
        
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
