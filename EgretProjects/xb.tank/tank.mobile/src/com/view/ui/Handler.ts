/**
 * 手柄
 * @author 
 *
 */
class Handler extends BaseUI{
    private socket: ClientSocket;
    private curAction:ActionEnum;  //当前动作
    
	public constructor() {
    	super("HandlerSkin");
	}
	
    public componentCreated(){
        super.componentCreated();
        this.socket = ClientSocket.getInstance();
    }
    
    public configListeners(){
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }
    
    public deConfigListeners(){
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }

    private onTouchMove(e:egret.TouchEvent){
        this.checkDirection(e.localX, e.localY);
    }
    
    private onTouchBegin(e:egret.TouchEvent) {
        this.checkDirection(e.localX,e.localY);
    }
    
    private onTouchEnd() {
        this.sendAction(ActionEnum.stopMove);
        this.visible = false;
    }
    
    public checkDirection(xPos, yPos){
        var angle = Math.atan2((yPos - 250),(xPos - 250)) * 180 / Math.PI + 180;
        if(angle >= 45 && angle <= 135) {
            this.sendAction(ActionEnum.up);
        } else if(angle >= 135 && angle <= 225) {
            this.sendAction(ActionEnum.right);
        } else if(angle >= 225 && angle <= 315) {
            this.sendAction(ActionEnum.down);
        } else {
            this.sendAction(ActionEnum.left);
        }
    }
    
    //发送动作
    public sendAction(actionType: ActionEnum) {
        //egret.log("send action:",actionType);
        if(this.curAction != actionType){
            this.curAction = actionType;
            this.socket.sendMessage("action",{ actionType: actionType,openid: GameConst.gameConfig.openid });
        }
    }
}
