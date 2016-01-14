/**
 * 游戏管理类
 * @author 
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();  //主页场景
    public gameScene: GameScene = new GameScene();  //游戏场景
    
    private socket:ClientSocket;

    public startup(main: Main): void {
        //配置socket
        this.socket = new ClientSocket();
        this.socket.homeScene = this.homeScene;
        this.socket.gameScene = this.gameScene;
        this.homeScene.socket = this.socket;
        this.gameScene.socket = this.socket;
        
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
        
        //连接socket
        this.socket.startConnect(window["server"]);
    }
    
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    
    //--------------------[接收]----------------------
    //链接成功
    public onConnect(){
        this.sendLogin();
    }
    
    //接收登录
    public revLogin(data){
        var status:number = data;
        egret.log("接收登录:" + status);
    }
    
    
    //--------------------[发送]----------------------
    //发送登录
    public sendLogin(): void {
        var json = { "uid": window["srvConfig"].uid, "rid":window["srvConfig"].rid};
        this.socket.sendMessage(NetConst.C2S_login,json,this.revLogin, this);
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
