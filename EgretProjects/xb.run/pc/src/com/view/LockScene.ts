/**
 * 校准
 * @author 
 *
 */
class LockScene extends BaseScene{
    private socket:ClientSocket;
    
	public constructor() {
    	super("LockSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.socket = ClientSocket.getInstance();        
    }

    public onEnable(): void {
        
    }

    public onRemove(): void {

    }
    
    /////////////////////////////////////////////////////////
    //-----------------[Socket 数据]-------------------------
    /////////////////////////////////////////////////////////
    
    //接收锁定
    public revLock(data) {
        egret.log("rev lock:",data);
        
        //TODO 所有人锁定完成，则开始游戏
        if(GameConst.debug){
            this.sendStartGame();
            LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
        }else{
            //TODO 显示校准玩家
        }
    }
    
    //发送开始游戏
    public sendStartGame(){
        egret.log("sendStartGame");
        this.socket.sendMessage("startGame");
    }
}
