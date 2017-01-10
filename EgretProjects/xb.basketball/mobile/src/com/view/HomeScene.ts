/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{

    private resultPanel: ResultPanel = new ResultPanel();  //结算面板
    
    public socket:ClientSocket;   //socket
    private ball:eui.Image;       //球
    private hand:eui.Image;       //手
    private tipLabel:eui.Label;   //提示文本
    
    private ballX:number;         //球初始位置
    private ballY:number;
    
    private countDownTimer:egret.Timer = new egret.Timer(650); //倒计时
    private countDownLimit:number = 3;  //倒计时限制
    
    private logoGroup:eui.Group;  //logoGroup
    private logoLoader:ImageLoad = new ImageLoad();
    
    private prizeGroup:eui.Group;    //领取奖品Group
    private messageLabel:eui.Label;  //消息文本
    private prizeBtn:eui.Image;      //领取按钮
    
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.ballX = this.ball.x;
        this.ballY = this.ball.y;
        this.socket = ClientSocket.getInstance();
        this.socket.homeScene = this;
    }

    public onEnable(): void {
        this.loadLogo();
        this.socket.startConnect();
        this.introduce();
        
        if(GameConst.isDebug){
            this.revLogin({bSuccess:true,msg:""});
        }
        
    }

    public onRemove(): void {
        
    }
    
    private loadLogo(){
        if(this.logoLoader.isEmpty()) {
            this.logoGroup.addChild(this.logoLoader);
            this.logoLoader.loadImg(window["logoUrl"]);
        }
    }
    
    //开始游戏
    private startGame(){
        this.configListeners();
        
        if(GameConst.isDebug){
            this.revGameOver({score:100}); 
        }
    }
    
    //游戏结束
    private gameOver(){
        egret.Tween.removeTweens(this.ball);
        this.ball.x = this.ballX;
        this.ball.y = this.ballY;

        this.deConfigListeners();
    }
    
    private configListeners(){
        this.ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        
    }
    
    private deConfigListeners(){
        this.ball.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }
    
    
    private startX:number;  //触摸坐标
    private startY:number;
    private endX:number;
    private endY:number;
    private onTouchBegin(e:egret.TouchEvent){
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        this.startX = e.stageX;
        this.startY = e.stageY;
    }

    private onTouchEnd(e:egret.TouchEvent){
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        this.endX = e.stageX;
        this.endY = e.stageY;
        if((this.startY - this.endY) > 25){  //手指上滑
            var radian:number = Math.atan2(this.endY - this.startY, this.endX - this.startX);
            //投球动画
            this.deConfigListeners();
            var self:HomeScene = this;
            var posX:number = Math.cos(radian)*1000;
            var posY:number = Math.sin(radian)*1000;
            egret.Tween.get(this.ball).to({x:this.ballX + posX, y:this.ballY + posY},300).call(function(){
                  self.configListeners();
                  self.ball.x = self.ballX;
                  self.ball.y = self.ballY;
            });

            //发送投球
            this.sendShoot(radian);
        }
    }
    
    //介绍界面
    private introduce() {
        this.tipLabel.visible = true;
        this.hand.visible = true;
        this.ball.visible = true;

        var handPos: number = this.hand.y;
        egret.Tween.get(this.hand,{ loop: true }).to({ y: handPos - 50 },500).to({ y: handPos },500);

        GameManager.getInstance().messageBox.showMessage("在wifi下游戏更流畅");
    }
    
    //开始倒计时
    private startCountDown(){
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
        var messageBox:MessageBox = GameManager.getInstance().messageBox;
        messageBox.showMessage(this.countDownLimit + "",50);
    }
    
    //倒计时处理
    private onCountDownHandler(){
        var count:number = this.countDownLimit - this.countDownTimer.currentCount;
        
        if(count > 0){
            GameManager.getInstance().messageBox.showMessage(count + "",50);
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
        this.sendLogin(); 
    }
        
    //连接失败
    public onError(data): void {
        GameManager.getInstance().messageBox.showMessage("连接服务器失败");
    }
        
    //连接断开
    public onDisconnect(): void {
        //游戏结算后，不显示断开连接
        if(!this.resultPanel.parent){
            GameManager.getInstance().messageBox.showMessage("网页连接已断开");
        }
    }
    
    //////////////////////////////////////////////////////
    //---------------------[发送数据]----------------------
    //////////////////////////////////////////////////////
    //发送登录
    private sendLogin(){
        var json = { "rid": egret.getOption("rid") };
        this.socket.sendMessage("login",json,this.revLogin,this);
        egret.log("发送登录请求:" + json.rid);
    }
    
    private sendShoot(angle:number){
        this.socket.sendMessage("shoot",{ "angle": parseFloat(angle.toFixed(2))});  //弧度
        egret.log("shoot angle:",parseFloat(angle.toFixed(2)));
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
        
        this.gameOver();
        
        //显示分数
        if(score >= window["prizeScore"]){
            this.prizeGroup.visible = true;
            this.messageLabel.text = "恭喜获得优惠券一张\n赶紧点击按钮领取吧(测试数据无效)";
            this.prizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
                location.href = window["prizeLink"];
            },this);
        }else{
            this.resultPanel.showScore(score);
            this.resultPanel.x = (GameConst.stage.stageWidth - this.resultPanel.width) / 2;
            this.resultPanel.y = (GameConst.stage.stageHeight - this.resultPanel.height) / 2;
            this.addChild(this.resultPanel);
        }
        
    }
   
}















