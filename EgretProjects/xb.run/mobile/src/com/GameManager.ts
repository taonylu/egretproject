/**
 * 游戏管理类
 * @author  陈凯
 *
 */
class GameManager {
    public preloadScene:PreloadScene;               //加载场景
    public lockScene: LockScene = new LockScene();  //校准场景
    public gameScene: GameScene = new GameScene();  //游戏场景
    public resultScene:ResultScene = new ResultScene(); //结果场景
    
    private socket:ClientSocket;
    
    //启动游戏框架
    public startup(main: Main): void {
        //配置其他信息
        GameConst.gameConfig = window["gameConfig"];
        GameConst.debug = GameConst.gameConfig.debug;
        GameConst.stage = main.stage;
        console.log("调试模式:",GameConst.debug);
        //配置Layer
        LayerManager.getInstance().initialize(main);
        
        //启动Socket
        this.socket = ClientSocket.getInstance();
        this.socket.gameManager = this;
        this.socket.lockScene = this.lockScene;
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
        var gameConfig = GameConst.gameConfig;
        
        
        var json ={
            rid:gameConfig.rid,
            openid: gameConfig.openid,
            headimgurl: gameConfig.headimgurl,
            nickname: gameConfig.nickname,
            userType:"mobile"
        }
        
        egret.log("send login:","rid:",json.rid,"openid:",json.openid);
        
        this.socket.sendMessage("login",json,this.revLogin,this);
    }
    
    //接收登录
    private revLogin(data) {
        egret.log("rev login");
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
        this.preloadScene.parent && this.preloadScene.parent.removeChild(this.preloadScene);
        this.preloadScene = null;
        
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
