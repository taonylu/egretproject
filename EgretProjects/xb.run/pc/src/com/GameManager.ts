/**
 * 游戏管理类
 * @author  陈凯
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();  //主页场景
    public gameScene: GameScene = new GameScene();  //游戏场景
    public lockScene:LockScene = new LockScene();   //校准场景
    public resultScene:ResultScene = new ResultScene(); //结算场景
    
    //启动游戏框架
    public startup(main: Main): void {
        
        //初始化配置
        GameConst.stage = main.stage;
        GameConst.gameCofig = window["gameConfig"];
        GameConst.debug = GameConst.gameCofig.debug;
        LayerManager.getInstance().initialize(main);
        console.log("调试模式:",GameConst.debug);
        //显示主页
        LayerManager.getInstance().runScene(this.homeScene); 
        
        //socket
        var socket:ClientSocket = ClientSocket.getInstance();
        socket.gameManager = this;
        socket.homeScene = this.homeScene;
        socket.gameScene = this.gameScene;
        socket.lockScene = this.lockScene;
        socket.startConnect(); 
    }
    
    public connect(){
         this.homeScene.sendLogin();
    }
    
    public disconnect(){
        
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
