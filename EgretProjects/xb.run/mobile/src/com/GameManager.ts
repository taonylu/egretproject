/**
 * 游戏管理类
 * @author  陈凯
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();  //主页场景
    public lockScene: LockScene = new LockScene();  //校准场景
    public gameScene: GameScene = new GameScene();  //游戏场景
    
    private socket:ClientSocket;
    
    //启动游戏框架
    public startup(main: Main): void {
        //配置其他信息
        GameConst.debug = window["gameConfig"].debug;
        
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
        //启动Socket
        this.socket = ClientSocket.getInstance();
        this.socket.gameManager = this;
        this.socket.homeScene = this.homeScene;
        this.socket.gameScene = this.gameScene;
        this.socket.startConnect();

    }
    
    
    //------------------------【socket事件】-------------------------
    
    public connect(){
        this.sendLogin();
    }
    
    public disconnect(){
        
    }
    //发送登录
    public sendLogin() {
        var rid = window["gameConfig"].rid;
        egret.log("send login:",rid,"userType:mobile");
        this.socket.sendMessage("login",{ rid: rid,userType: "mobile" },this.revLogin,this);
    }
    
    //接收登录
    private revLogin(data) {
        egret.log("rev login1");
        var success: boolean = data.success;
        var msg: string = data.msg;

        if(success) {
            //TODO 
        } else {
            alert(msg);
        }
    }
    
    //接收开始校准
    public revStartLock() {
        egret.log("revStartLock");
        LayerManager.getInstance().runScene(GameManager.getInstance().lockScene);
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
