/**
 * 游戏管理类
 * @author 
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();  //主页场景
    public gameScene: GameScene = new GameScene();  //游戏场景
    public messageBox:MessageBox = new MessageBox();    //消息框
    private socket:ClientSocket;
    public bReconnect:Boolean = false;  //当次连接是否是重连

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
        
        this.socket.startConnect();
    }
    
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    
    //--------------------[接收]----------------------
    //链接成功
    public onConnect(){
        this.sendLogin();
    }
    
    //断开链接
    public onDisconnect(){
        //alert("已与服务器断开连接");
        if(this.gameScene.parent){
            this.gameScene.reset();
        }
        LayerManager.getInstance().runScene(this.homeScene);
        this.messageBox.showMessage("已与服务器断开连接\n请尝试重新加入游戏")
    }
    
    public onError(){
        this.messageBox.showMessage("连接错误");
    }
    
    //接收登录
    public revLogin(data){
        var status: number = data; //-1 房间不存在， 0 用户信息错误， 1 进入房间成功
        egret.log("接收登录:" + status);
        switch(status){
            case 1:
                if(this.bReconnect){  //断线重连
                    this.homeScene.sendUserReady();
                    this.bReconnect = false;
                }
            break;
            case -1:
                this.messageBox.showMessage("房间不存在");
            break;
            case 0:
                this.messageBox.showMessage("用户信息错误");
            break;
        }
    }
    
    
    //--------------------[发送]----------------------
    //发送登录
    public sendLogin(): void {
        egret.log("发送登录");
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
