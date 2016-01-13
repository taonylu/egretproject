/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    public socket: ClientSocket;             //socket
    
    private userGroup:eui.Group;             //用户Group
    private headUIList:Array<HeadUI>;        //头像数组
    private userMax:number = 8;              //用户最大数量
    
    private qrcodeGroup:eui.Group;           //二维码定位用
    
    private shaLou:eui.Image;                //沙漏
    private countDownLabel:eui.BitmapLabel;  //倒计时文本
    private timeLimit:number = 20;           //倒计时时间 
    private countDownTimer:egret.Timer = new egret.Timer(1000); 
    
    
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
    
    //开始倒计时
    private startCountDown():void{
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
        this.shaLou.visible = false;
        this.countDownLabel.visible = true;
        this.countDownLabel.text = this.timeLimit.toString();
    }
    
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
    
    private stopCountDown():void{
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler,this);
        this.countDownTimer.stop();
    }
    
     ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    
    //-----------------------------发送数据----------------------------------
    

    
    //-----------------------------接收数据----------------------------------
    
    //返回登录成功
    public revLogin(data) {
        var status: Number = data.status; //  -1 房间已经存在 ， 0 房间错误， 1 开放成功

        egret.log("登录返回，房间状态：",status);
        switch(status){
            case 1:
                this.startCountDown();
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
        var uid: string = data.uid;        //用户id
        egret.log("玩家加入,头像:" + headimgurl,"名字:" + nickname,"ID:" + uid);
        
        //设置用户名，选取列表靠前的一个空文本。因为可能出现靠前的玩家退出游戏。
        var index:number = -1;
        var headUI:HeadUI;
        for(var i:number = 0;i<this.userMax;i++){
            headUI = this.headUIList[i];
            if(headUI.isEmpty()){
                headUI.userID = uid;
                headUI.setNameLabel(nickname);
                headUI.loadImg(headimgurl);
                break;
            }
        }
        
        //保存用户
        var userVO: UserVO = new UserVO();
        userVO.uid = uid;
        userVO.name = name;
        userVO.headImg = new egret.Bitmap(headUI.headImg.bitmapData); //新建一张用户头像图片，用于技能显示
        UserManager.getInstance().userList[uid] = userVO;
    }

    //玩家退出
    public revUserQuit(data): void {
        var uid: string = data.uid;  //用户id
        egret.log("玩家退出:",uid);
        //删除玩家头像
        for(var i:number=0; i<this.userMax;i++){
            if(this.headUIList[i].userID == uid){
                this.headUIList[i].clear();
            }
        }
        //列表删除用户
        delete UserManager.getInstance().userList[uid];
        
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















