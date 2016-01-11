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
        
        //连接socket
        //socket.startConnect(NetConst.url);
        
        //模拟数据
//        var json = { "mapdata": []};
//        json.mapdata = [
//            [1,0,0,0,1,0,1],
//            [0,0,1,0,0,1,0],
//            [0,0,1,0,0,0,1],
//            [1,0,0,1,0,1,1],
//            [0,0,1,0,0,0,0],
//            [1,0,0,0,0,0,0],
//            [0,0,0,0,0,1,0],
//            [1,0,0,1,0,0,0]
//        ];
//        this.homeScene.revMapData(json);
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
