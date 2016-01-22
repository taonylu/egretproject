/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    //=============[ClientSocket]=============
    public socket: ClientSocket;             //socket
    
    //=============[声音]=============
    public snd:SoundManager = SoundManager.getInstance();
    
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
    
    private gameIntroLabel:eui.Label;  //游戏介绍
    
    private cloudGroup:eui.Group;   //云朵
    private cloudList:Array<eui.Image> = new Array<eui.Image>();
    
    private flowerPaticle:FlowerParticle = new FlowerParticle();  //花瓣掉落粒子效果
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initView();
        
    }

    public onEnable(): void {
       this.snd.playBgm(this.snd.homeBgm);
       this.showShaLou();
       this.moveCloud();
       
    }

    public onRemove(): void {
        this.stopCloud();
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
        //游戏规则
        this.gameIntroLabel.text = "1 扫描二维码，进入房间，点击“加入游戏”开始排队，每局最多8名玩家\n\n" + 
        "2 当玩家达到4名就开始倒计时，倒计时期间新玩家也可以加入游戏\n\n" +
        "3 每局游戏有三个关卡，只要有三位玩家完成三关，游戏结束\n\n" +
        "4 游戏期间借助道具让你更有优势\n";
        //云朵 共3朵
        for(var i:number=0;i<3;i++){
            this.cloudList.push(this["cloud" + i]);
        }
        //花瓣粒子效果
        LayerManager.getInstance().popLayer.addChild(this.flowerPaticle);
        this.flowerPaticle.start();
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
    
    //移动云朵
    private moveCloud(){
        this.addEventListener(egret.Event.ENTER_FRAME, this.onMoveCloud,this); 
    }
    
    //移动云朵处理
    private onMoveCloud(){
        var len: number = this.cloudList.length;
        var cloud:eui.Image;
        for(var i: number = 0;i <len;i++) {
            cloud = this.cloudList[i];
            cloud.x -= 0.2+i/10;
            if(cloud.x < -55) {
                cloud.x = this.cloudGroup.width;
            }
        }
    }
    
    //停止云朵
    private stopCloud(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onMoveCloud,this); 
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
                alert("房间号错误，请尝试修改房间号后刷新网页");
                break;
            case -1:
                alert("房间已存在，请尝试修改房间号后刷新网页");
                break;
            default:
        }
    }
    
    //玩家加入
    public revUserJoin(data): void {
        var headimgurl: string = data.headimgurl;  //用户头像
        var nickname: string = data.nickname;      //用户名
        var uid: string = data.uid;                //用户id
        var sex:number = data.sex;                 //用户性别 1男 2女
        egret.log("玩家加入,头像:" + headimgurl,"名字:" + nickname,"ID:" + uid, "sex:",sex);
        
        //保存用户
        var userVO: UserVO = new UserVO();
        userVO.uid = uid;
        userVO.name = nickname;
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
                
                //播放用户加入声音
                if(sex == 1){
                    this.snd.play(this.snd.enterMan);
                }else if(sex == 2){
                    this.snd.play(this.snd.enterWoman);
                }
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















