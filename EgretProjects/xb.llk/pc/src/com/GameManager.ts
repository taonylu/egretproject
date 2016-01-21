/**
 * 游戏管理类,单例类
 * @author  陈凯
 *
 */
class GameManager {
    //=============[场景]================
    public homeScene: HomeScene = new HomeScene();  //主页场景
    public gameScene: GameScene = new GameScene();  //游戏场景
    
    //==============[UI]=================
    public barrageUI:BarrageUI;   //弹幕UI
    
    //==============[其他]==================
    public socket:ClientSocket;   //ClientSocket                  
    
    //启动游戏框架
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
        
        //创建弹幕层
        this.barrageUI = new BarrageUI();
        LayerManager.getInstance().popLayer.addChild(this.barrageUI);
        
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);  
        
        //链接socket
        this.socket.startConnect(window["server"]);
    }
    
    
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    
    //==================[接收数据]=================
    
    //连接成功
    public onConnect():void{
        this.sendLoginRequest();
    }

    //接收弹幕
    public revBarrage(data){
        var msg:string = data.msg;
        this.barrageUI.showOneMsg(msg);
    }
    
    
    //=================[发送数据]=====================
    //发送登录请求
    public sendLoginRequest(){
        var json = {"rid": window["srvConfig"].rid};
        this.socket.sendMessage(NetConst.C2S_login,json , this.homeScene.revLogin, this.homeScene);
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
