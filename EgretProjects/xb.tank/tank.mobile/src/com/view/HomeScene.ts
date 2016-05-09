/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private socket:ClientSocket;
    
    private directionBg:eui.Rect;
    private aBtn: eui.Button;
    private bBtn:eui.Button;
    private handler:Handler; //方向操作
    
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.socket = ClientSocket.getInstance();
    }

    public onEnable(): void {
       this.startConnect();
       this.handler.visible = false;
       egret.log("用户id:",GameConst.gameConfig.openid);
       egret.log("用户昵称:",GameConst.gameConfig.nickname);
    }

    public onRemove(): void {
        
    }
    
    private configListeners() {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.handler.configListeners();
    }

    private deConfigListeners() {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.handler.deConfigListeners();
    }

    private curTouchTarget;  //当前触摸对象

    private onTouchBegin(e: egret.TouchEvent) {
        switch(e.target) {
            case this.aBtn:
            case this.bBtn:
                this.sendAction(ActionEnum.shoot);
                break;
            case this.directionBg:
                this.handler.x = e.stageX - this.handler.width/2;
                this.handler.y = e.stageY - this.handler.height/2;
                this.handler.visible = true;
                break;
        }
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
            group: gameConfig.group,
            count:gameConfig.count,
            userType:"mobile"
        }
        this.socket.sendMessage("login",json);
    }
    
    //接收登录
    public revLogin(data){
        var success:string = data.success;
        var msg:string = data.msg;
        egret.log("rev login:"," success:",success," msg:",msg);
    }
    
    //接收游戏开始
    public revStartGame(){
        egret.log("rev startGame");
        this.configListeners();
    }
    
    //发送动作
    public sendAction(actionType: ActionEnum) {
        //egret.log("send action:",actionType);
        this.socket.sendMessage("action",{ actionType: actionType,openid: GameConst.gameConfig.openid });
    }
    
    //接收游戏结束
    public revGameOver(data) {
        egret.log("rev gameOver");
    }
    
}















