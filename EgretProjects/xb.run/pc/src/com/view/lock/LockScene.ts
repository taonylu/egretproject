/**
 * 校准
 * @author 
 *
 */
class LockScene extends BaseScene{
    private socket:ClientSocket;
    
    private countDownGroup:eui.Group;
    private countDownLabel:eui.BitmapLabel;  //倒计时
    private countDownTimer:egret.Timer = new egret.Timer(1000);
    private countDownLimit:number = 10;
    
    private goImg:eui.Image;  //Let' Go 字样
    
    private hand:eui.Image;  //手
    
	public constructor() {
    	super("LockSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.socket = ClientSocket.getInstance();      
        this.initHandY = this.hand.y;
        this.countDownLimit = window["gameConfig"].lockTime;
    }

    public onEnable(): void {
        this.resetScene();
        this.startCountDown();
        this.startHandAnim();
    }

    public onRemove(): void {
        this.stopHandAnim();
    }
    
    private resetScene(){
        this.lockNum = 0;
    }
    
    private initHandY:number;
    private startHandAnim(){
        egret.Tween.get(this.hand,{loop:true}).to({y:this.initHandY-100},400).to({y:this.initHandY},400);
    }
    
    private stopHandAnim(){
        egret.Tween.removeTweens(this.hand);
        this.hand.y = this.initHandY;
    }
    
    private startCountDown(){
        this.countDownGroup.visible = true;
        this.goImg.visible = false;
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
        this.countDownGroup.visible = false;
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
        this.countDownTimer.stop();
    }
    
    private startGame(){
        this.stopCountDown();
        
        //播放let's go 动画
        var self:LockScene = this;
        this.goImg.scaleX = 0.1;
        this.goImg.scaleY = 0.1;
        this.goImg.visible = true;
        egret.Tween.get(this.goImg).to({scaleX:1.2,scaleY:1.2},1200,egret.Ease.elasticOut).call(function(){
            self.sendStartGame();
            LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
        });
    }
    
    /////////////////////////////////////////////////////////
    //-----------------[Socket 数据]-------------------------
    /////////////////////////////////////////////////////////
    
    //接收锁定
    private lockNum:number = 0;  //已校准人数
    public revLock(data) {
        console.log("revLock:",data);
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
        console.log("sendStartGame");
        
        //cnzz记录
        window["czcStartGame"](UserManager.getInstance().getUserNum());
        
        this.socket.sendMessage("startGame");
    }
}
