/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private socket:ClientSocket;
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.socket = ClientSocket.getInstance();
    }

    public onEnable(): void {
       this.startConnect();
    }

    public onRemove(): void {
        
    }
    
    
    //开始连接socket
    private startConnect() {
        if(this.socket.isConnected() == false) {
            this.socket.startConnect();
        }
    }
    
    //连接成功
    public connect(){
        this.sendLogin();
    }
    
    //发送登录请求
    private sendLogin(){
        egret.log("send login");
        var gameConfig = GameConst.gameConfig;
        var json = {
            rid: gameConfig.rid,
            openid: gameConfig.openid,
            headimgurl: gameConfig.headimgurl,
            nickname: gameConfig.nickname,
            userType:"mobile"
        }
        this.socket.sendMessage("login",json,this.revLogin,this);
    }
    
    //接收登录
    private revLogin(data){
        var success:string = data.success;
        var msg:string = data.msg;
        egret.log("rev login:"," success:",success," msg:",msg);
    }
    
    //接收游戏开始
    public revStartGame(){
        egret.log("rev startGame");
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
}















