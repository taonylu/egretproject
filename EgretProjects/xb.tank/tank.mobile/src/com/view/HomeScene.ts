/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private socket:ClientSocket;
    
    private directionBg:eui.Rect;
    private upBtn: eui.Rect;
    private downBtn: eui.Rect;
    private leftBtn: eui.Rect;
    private rightBtn: eui.Rect;
    private aBtn: eui.Button;
    private bBtn:eui.Button;
    
    
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
    
    private configListeners() {
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }

    private deConfigListeners() {
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }

    private curTouchTarget;  //当前触摸对象
    private onTouchMove(e: egret.TouchEvent) {
        if(this.curTouchTarget == e.target) {
            return;
        }
        this.curTouchTarget = e.target;
        switch(this.curTouchTarget) {
            case this.upBtn:
                this.sendAction(ActionEnum.up);
                break;
            case this.downBtn:
                this.sendAction(ActionEnum.down);
                break;
            case this.leftBtn:
                this.sendAction(ActionEnum.left);
                break;
            case this.rightBtn:
                this.sendAction(ActionEnum.right);
                break;
        }

    }

    private onTouchBegin(e: egret.TouchEvent) {
        //console.log("begin",e.target);
        switch(e.target) {
            case this.upBtn:
                this.sendAction(ActionEnum.up);
                break;
            case this.downBtn:
                this.sendAction(ActionEnum.down);
                break;
            case this.leftBtn:
                this.sendAction(ActionEnum.left);
                break;
            case this.rightBtn:
                this.sendAction(ActionEnum.right);
                break;
            case this.aBtn:
            case this.bBtn:
                this.sendAction(ActionEnum.shoot);
                break;
        }
    }

    private onTouchEnd(e: egret.TouchEvent) {
        //console.log("touchEnd:",e.target);
        switch(e.target){
            case this.upBtn:
            case this.downBtn:
            case this.leftBtn:
            case this.rightBtn:
            case this.directionBg:
                this.sendAction(ActionEnum.stopMove);
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















