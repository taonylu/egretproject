/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{

    public socket:ClientSocket;   //socket
    private ball:eui.Image;       //球
    private hand:eui.Image;       //手
    private tipLabel:eui.Label;   //提示文本
    
    private countDownTimer:egret.Timer = new egret.Timer(1000); //倒计时
    private countDownLimit:number = 1;  //倒计时限制
    
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.socket = ClientSocket.getInstance();
    }

    public onEnable(): void {
        this.socket.startConnect();
        this.introduce();
        
        if(GameConst.isDebug){
            this.revLogin({bSuccess:true,msg:""});
        }
        
    }

    public onRemove(): void {
        
    }
    
    //开始游戏
    private startGame(){
        this.ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    }
    
    private onTouchBegin(e:egret.TouchEvent){
        this.ball.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }
    
    private onTouchMove(e:egret.TouchEvent){
        this.ball.x = e.stageX;
        this.ball.y = e.stageY;
        console.log(this.ball.y ,e.stageY);
    }
    
    private onTouchEnd(e:egret.TouchEvent){
        
    }
    
    //介绍界面
    private introduce() {
        this.tipLabel.visible = true;
        this.hand.visible = true;
        this.ball.visible = true;

        var handPos: number = this.hand.y;
        egret.Tween.get(this.hand,{ loop: true }).to({ y: handPos - 50 },500).to({ y: handPos },500);

        GameManager.getInstance().messageBox.showMessage("建议在wifi下进行游戏");
    }
    
    //开始倒计时
    private startCountDown(){
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
        var messageBox:MessageBox = GameManager.getInstance().messageBox;
        messageBox.setFontSize(50);
        messageBox.showMessage(this.countDownLimit + "");
    }
    
    //倒计时处理
    private onCountDownHandler(){
        var count:number = this.countDownLimit - this.countDownTimer.currentCount;
        
        if(count > 0){
            GameManager.getInstance().messageBox.showMessage(count + "");
        }else{
            //停止计时
            this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler,this);
            this.countDownTimer.stop();
            //隐藏组件
            egret.Tween.removeTweens(this.hand);
            this.hand.visible = false;
            GameManager.getInstance().messageBox.hide();
            //开始游戏
            this.startGame();
        }
    }
    
    
    
    
    
    
    
    
    
    //////////////////////////////////////////////////////
    /////////////////   网络连接     //////////////////////
    //////////////////////////////////////////////////////
    
    //连接成功
    public onConnect(): void {
        var json = {rid:egret.getOption("rid")};
        this.socket.sendMessage("login",json,this.revLogin,this);
        egret.log("发送登录请求:" + json);
    }
        
    //连接失败
    public onError(data): void {
        GameManager.getInstance().messageBox.showMessage("连接服务器失败");
    }
        
    //连接断开
    public onDisconnect(): void {
        GameManager.getInstance().messageBox.showMessage("与网页断开连接");
    }

    //////////////////////////////////////////////////////
    //---------------------[接收数据]----------------------
    //////////////////////////////////////////////////////
    
    //接收登录结果
    private revLogin(data){
        var bSuccess:Boolean = data.bSuccess;
        var msg:string = data.msg;
        egret.log("接收登录结果:",bSuccess,msg);
        
        if(bSuccess){
            this.startCountDown();
        }else{
            GameManager.getInstance().messageBox.showMessage(msg);
        }
    }
    
    //接收游戏结束
    public revGameOver(data){
        var score:number = data.score;
        egret.log("接收游戏结束:",score);
        
        
    }
   
}















