/**
 * 游戏管理类
 * @author  陈凯
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();  //主页场景
    public gameScene: GameScene = new GameScene();  //游戏场景
    
    private socket:ClientSocket;
    
    //启动游戏框架
    public startup(main: Main): void {
        //配置其他信息
        GameConst.debug = window["gameConfig"].debug;
        
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
        //显示首页
        LayerManager.getInstance().runScene(this.gameScene);  
        
        //启动Socket
        this.socket = ClientSocket.getInstance();
        this.socket.gameManager = this;
        this.socket.homeScene = this.homeScene;
        this.socket.gameScene = this.gameScene;
        //this.socket.startConnect();

    }
    
    
    //------------------------【socket事件】-------------------------
    
    public connect(){
        this.homeScene.sendLogin();
    }
    
    public disconnect(){
        
    }
    
    //------------------------【发送】-------------------------
    
    
    
    
    
    //------------------------【接收】-------------------------
    
    

    
    //获取单例
    private static instance: GameManager;
    public static getInstance(): GameManager {
        if(this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
}
