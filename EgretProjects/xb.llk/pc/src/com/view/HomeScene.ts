/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    //=============[ClientSocket]=============
    public socket: ClientSocket;             //socket
    
    //=============[用户头像]=============
    private userGroup:eui.Group;             //用户Group
    private headUIList:Array<HeadUI>;        //头像数组
    private userMax:number = 8;              //用户最大数量
    
    //=============[二维码]=============
    private qrcodeGroup:eui.Group;           //二维码定位用
    
    //=============[倒计时]=============
    private shaLou:eui.Image;                //沙漏
    private countDownLabel:eui.BitmapLabel;  //倒计时文本
    private timeLimit:number = 20;           //倒计时时间 
    private countDownTimer:egret.Timer = new egret.Timer(1000);  //计时器
    
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initView();
    }

    public onEnable(): void {
       this.showShaLou();
    }

    public onRemove(): void {
        
    }
    
    public reset(){
        
    }
    
     ///////////////////////////////////////////////////
    ///-----------------[游戏UI]----------------------
    ///////////////////////////////////////////////////

    private initView():void{
        //初始头像
        this.headUIList = new Array<HeadUI>();
        for(var i: number = 0;i < this.userMax;i++) {
            this.headUIList.push(this["headUI" + i]);
        }
        //生成二维码
        var qrcdeLoader:QRCodeLoader = new QRCodeLoader();
        qrcdeLoader.load(window["qrcodeUrl"], window["codeWidth"],window["codeHeight"], window["logoUrl"]);
        this.qrcodeGroup.addChild(qrcdeLoader);
    }
    
    //显示沙漏
    private showShaLou(){
        this.shaLou.visible = true;
        this.countDownLabel.visible = false;
    }
    
    private resetHeadUI(){
        var len:number = this.headUIList.length;
        for(var i: number = 0;i < len;i++) {
            this.headUIList[i].reset();
        }
    }
    
    //开始倒计时
    private startCountDown():void{
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
        this.countDownLabel.visible = true;
        if(this.timeLimit < 10){
            this.countDownLabel.text = "0" + this.timeLimit.toString();
        }else{
            this.countDownLabel.text = this.timeLimit.toString();
        }
        
    }
    
    //倒计时处理
    private onCountDownHandler(e:egret.TimerEvent){
        var curTimeCount = this.timeLimit - this.countDownTimer.currentCount;
        
        //倒计时结束，则进入游戏
        if(curTimeCount < 0) {
            this.stopCountDown();
            return;
        }
        //个位数计时补0
        if(curTimeCount < 10){ 
            this.countDownLabel.text = "0" +  curTimeCount.toString();   
        }else{
            this.countDownLabel.text =  curTimeCount.toString();   
        }
    }
    
    //停止倒计时
    private stopCountDown():void{
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler,this);
        this.countDownTimer.stop();
    }
    
     ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    
    //=====================接收数据======================
    
    //返回登录成功
    public revLogin(data) {
        var status: Number = data; //  -1 房间已经存在 ， 0 房间错误， 1 开放成功

        egret.log("登录返回，房间状态：",status);
        switch(status){
            case 1:
                
                break;
            case 0:
                break;
            case -1:
                break;
            default:
        }
    }
    
    //玩家加入
    public revUserJoin(data): void {
        var headimgurl: string = data.headimgurl;  //用户头像
        var nickname: string = data.nickname;      //用户名
        var uid: string = data.uid;                //用户id
        egret.log("玩家加入,头像:" + headimgurl,"名字:" + nickname,"ID:" + uid);
        
        //保存用户
        var userVO: UserVO = new UserVO();
        userVO.uid = uid;
        userVO.name = name;
        UserManager.getInstance().storeUser(userVO);

        
        //设置用户名，选取列表靠前的一个空文本。因为可能出现靠前的玩家退出游戏。
        var index:number = -1;
        var headUI:HeadUI;
        for(var i:number = 0;i<this.userMax;i++){
            headUI = this.headUIList[i];
            if(headUI.isEmpty()){
                userVO.headUI = headUI;
                headUI.userID = uid;
                headUI.setNameLabel(nickname);
                headUI.loadImg(headimgurl);
                break;
            }
        }
    }
    
    //倒计时
    public revCountDown(data) {
        var time:number = data.time;
        egret.log("倒计时:" + time);
        this.timeLimit = time/1000;
        this.shaLou.visible = false;
        this.startCountDown();
    }
    
    //清除倒计时
    public revClearCountDown(data) {
        egret.log("停止倒计时");
        this.stopCountDown();
        this.showShaLou();
    }

    //玩家退出
    public revUserQuit(data): void {
        var uid: string = data.uid;  //用户id
        egret.log("玩家退出:",uid);
        //列表删除用户
        UserManager.getInstance().deleteUser(uid);
        
        //TODO 游戏中玩家退出，可能是大屏用户
    }

    //游戏开始
    public revGameStart(data):void {
        var mapData:any = data.mapData;        //地图信息
        var luckyUser:string = data.luckyUser; //大屏幕显示的用户
        
        egret.log("游戏开始，幸运用户:",luckyUser);
        
        //记录地图信息
        MapManager.getInstance().level.length = 0;
        MapManager.getInstance().level.push(mapData[0],mapData[1],mapData[2]);
        
        //记录幸运用户
        UserManager.getInstance().luckyUser = luckyUser;
        
        //跳转场景
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
        
    }
    
    
 
    
}















