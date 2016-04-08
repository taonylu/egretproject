/**
 * 校准
 * @author 
 *
 */
class LockScene extends BaseScene{
    private socket:ClientSocket;
    private countDownLabel:eui.BitmapLabel;  //倒计时
    private countDownTimer:egret.Timer = new egret.Timer(1000);
    private countDownLimit:number = 15;
    
	public constructor() {
    	super("LockSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.socket = ClientSocket.getInstance();      
        if(GameConst.debug){
            this.countDownLimit = 5;
        }
    }

    public onEnable(): void {
        this.resetScene();
        this.startCountDown();
    }

    public onRemove(): void {

    }
    
    private resetScene(){
        this.lockNum = 0;
    }
    
    private startCountDown(){
        this.countDownLabel.text = this.countDownLimit + "";
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    }
    
    private onTimerHandler(){
        var count = this.countDownLimit - this.countDownTimer.currentCount;
        if(count <= 0){
            if(this.parent){
                this.startGame();
            }
        }
        this.countDownLabel.text = count + "";
    }
    
    private stopCountDown(){
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
        this.countDownTimer.stop();
    }
    
    private startGame(){
        this.stopCountDown();
        this.sendStartGame();
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
    /////////////////////////////////////////////////////////
    //-----------------[Socket 数据]-------------------------
    /////////////////////////////////////////////////////////
    
    //接收锁定
    private lockNum:number = 0;  //已校准人数
    public revLock(data) {
        egret.log("rev lock:",data);
        var openid:string = data.openid;
        this.lockNum++;
        if(this.parent){
            if(GameConst.debug) {
                this.startGame();
            } else {
                //所有人校准完成
                var len = UserManager.getInstance().getUserNum();
                if(this.lockNum >= len) {
                    this.startGame();
                }
            }
        }
    }
    
    //发送开始游戏
    public sendStartGame(){
        egret.log("sendStartGame");
        this.socket.sendMessage("startGame");
    }
}
