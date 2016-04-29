/**
 * 游戏管理类
 * @author  陈凯
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();  //主页场景
    
    //启动游戏框架
    public startup(main: Main): void {
        //获取配置信息
        GameConst.gameConfig = window["gameConfig"];
        
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
        //配置socket
        var socket:ClientSocket = ClientSocket.getInstance();
        socket.homeScene = this.homeScene;
        
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
