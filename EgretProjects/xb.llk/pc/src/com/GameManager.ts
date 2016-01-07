/**
 * 游戏管理类
 * @author 
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();  //主页场景
    public gameScene: GameScene = new GameScene();  //游戏场景

    public startup(main: Main): void {
        //配置socket
        var socket:ClientSocket = new ClientSocket();
        socket.homeScene = this.homeScene;
        socket.gameScene = this.gameScene;
        this.homeScene.socket = socket;
        this.gameScene.socket = socket;
        
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);  
        
        //模拟数据
        var json = {"mapData":[],"luckyUser":1};
        json.mapData[0] = [
            [1,0,0,0,1,0,0],
            [0,0,1,0,0,1,0],
            [0,0,1,0,0,0,0],
            [0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ];
        json.mapData[1] = [
            [1,1,0,0,1,0,0],
            [0,0,1,0,0,1,0],
            [0,0,1,0,0,0,0],
            [0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ];
        json.mapData[2] = [
            [1,1,1,0,1,0,0],
            [0,0,1,0,0,1,0],
            [0,0,1,0,0,0,0],
            [0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ];
        
        
        this.homeScene.revGameStart(json);
        
        //链接socket
        //socket.startConnect(NetConst.url);
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
