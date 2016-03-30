/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{

    private socket:ClientSocket;                            //socket
    
    private codeLoader: QRCodeLoader = new QRCodeLoader();  //二维码
    private codeGroup: eui.Group;                           //二维码容器
    private rid: string;                                    //房间号
    
    private countDownTimer:egret.Timer = new egret.Timer(1000); //倒计时计时器
    private countDownLimit = 20;   //倒计时限制
    
    
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.socket = ClientSocket.getInstance();
        
        this.createQRCode();
    }

    public onEnable(): void {
        
    }

    public onRemove(): void {
        
    }
    
    //生成二维码
    private createQRCode(){
        //随机房间号
        this.rid = (new Date()).getTime() + NumberTool.getVerificationCode(6);
        
        //index创建二维码图片
        window["createQRCode"](this.rid);
        
        //加载二维码图片
        var codeLoader: QRCodeLoader = new QRCodeLoader();
        var gameConfig = window["gameConfig"];
        codeLoader.load(gameConfig.codeData,gameConfig.codeWidth,gameConfig.codeHeight,gameConfig.logoUrl);
        codeLoader.x = (GameConst.stage.stageWidth - gameConfig.codeWidth) / 2;
        codeLoader.y = (GameConst.stage.stageHeight - gameConfig.codeHeight) / 2;
        this.addChild(codeLoader);
    }
    
    private startCountDown(){
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    }
    
    private onCountDownHandler(){
        var count =  this.countDownLimit - this.countDownTimer.currentCount;
        
        //倒计时结束，开始校准
        if(count < 0){
            this.countDownTimer.stop();
            this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler,this);
            this.sendStartLock();
        }
    }
    
    /////////////////////////////////////////////////////////
    //-----------------[Socket 数据]-------------------------
    /////////////////////////////////////////////////////////
    //发送登录
    public sendLogin(){
        egret.log("sendLogin：", this.rid);
        var rid = this.rid;
        this.socket.sendMessage("login",{rid:rid,userType:"pc"},this.revLogin,this);
    }
    
    //接收登录
    private revLogin(data){
        egret.log("rev login:",data);
        var success:boolean = data.success;
        var msg:string = data.msg;
        if(success){
            //TODO 登录成功提示
        }else{
            //TODO 登录失败提示
        }
    }
    
    //接收用户进入
    public revUserJoin(data){
        egret.log("rev userJoin:",data);
        if(GameConst.debug){
            this.sendStartLock();
            LayerManager.getInstance().runScene(GameManager.getInstance().lockScene);
        }else{
            //TODO 显示用户信息，第一人进入，则开始倒计时
        }
    }
    
    //用户离开
    public revUserQuit(data){
        egret.log("rev userQuit:",data);
        //TODO 删除用户
    }
    
    //发送开始校准
    private sendStartLock(){
        egret.log("sendStartLock");
        this.socket.sendMessage("startLock");
    }
   
}















