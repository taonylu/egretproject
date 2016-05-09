/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private socket:ClientSocket;
    
    private upBtn:eui.Button;
    private downBtn:eui.Button;
    private leftBtn:eui.Button;
    private rightBtn:eui.Button;
    private shootBtn:eui.Button;
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.socket = ClientSocket.getInstance();
    }

    public onEnable(): void {
        this.configListeners();
    }

    public onRemove(): void {
        
    }
    
    private configListeners(){
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }
    
    private deConfigListeners(){
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }
    
    private curTouchTarget;  //当前触摸对象
    private onTouchMove(e:egret.TouchEvent){
        if(this.curTouchTarget == e.target){
            return;
        }
        this.curTouchTarget = e.target;
        switch(this.curTouchTarget){
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
            case this.shootBtn:
                this.sendAction(ActionEnum.shoot);
                break;
        }
    }
    
    private onTouchEnd(e:egret.TouchEvent){
        //console.log("touchEnd:",e.target);
        switch(e.target) {
            case this.upBtn:
            case this.downBtn:
            case this.leftBtn:
            case this.rightBtn:
            case this.shootBtn:
                this.sendAction(ActionEnum.stopMove);
                break;
        }
    }
    
    
    public sendAction(actionType:ActionEnum){
        //egret.log("send action:",actionType);
        this.socket.sendMessage("action",{actionType:actionType, openid:GameConst.gameConfig.openid});
    }
    
    //接收游戏结束
    public revGameOver(data){
        egret.log("rev gameOver");
        var wave = data.wave;
        var heroRank = data.heroRank;
        var prize = data.prize;
        
        
        
    }

    
}









