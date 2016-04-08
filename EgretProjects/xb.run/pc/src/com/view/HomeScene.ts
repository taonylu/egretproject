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
    private countDownLimit = 15;   //倒计时限制
    
    private headList: Array<HeadUI> = new Array<HeadUI>();   //头像UI
    private head0:HeadUI;
    private head1:HeadUI;
    private head2:HeadUI;
    
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.socket = ClientSocket.getInstance();
        this.initView();  
    }

    public onEnable(): void {
        this.resetScene();    //重置场景
    }

    public onRemove(): void {
        
    }
    
    //初始化视图
    private initView(){
        this.initHead();     //初始化头像相关
        this.initCountDown();//初始化倒计时相关
    }
    
    //重置场景
    private resetScene(){
        this.createQRCode();      //创建二维码
        this.clearHead();         //清理头像
        this.clearUserManager();  //清理用户列表
    }
    
    //初始化头像相关
    private initHead(){
        this.headList.push(this.head0,this.head1,this.head2);
        this.head0.infoLabel.text = "选择暴躁鹿";
        this.head1.infoLabel.text = "选择嘻哈兔";
        this.head2.infoLabel.text = "选择悠悠熊猫";
    }
    
    //初始化倒计时相关
    private initCountDown(){
        this.countDownLimit = (GameConst.debug)?1:15;
    }
    
    //清理头像
    private clearHead(){
        this.head0.clear();
        this.head1.clear();
        this.head2.clear();
    }
    
    //清理用户列表
    private clearUserManager(){
        UserManager.getInstance().clearAllUser();  //清理用户列表
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
        this.codeGroup.addChild(codeLoader);
    }
    
    //开始倒计时
    private startCountDown(){
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    }
    
    //倒计时处理
    private onCountDownHandler(){
        var count =  this.countDownLimit - this.countDownTimer.currentCount;
        //TODO 显示倒计时
        
        //倒计时结束，开始校准
        if(count < 0){
           this.stopCountDown();
            LayerManager.getInstance().runScene(GameManager.getInstance().lockScene);
            this.sendStartLock();
        }
    }
    
    //停止倒计时
    private stopCountDown(){
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler,this);
        this.countDownTimer.stop();
    }
    
    /////////////////////////////////////////////////////////
    //-----------------[Socket 数据]-------------------------
    /////////////////////////////////////////////////////////
    //发送登录
    public sendLogin(){
        egret.log("sendLogin：", this.rid);
        var rid = this.rid;
        if(GameConst.debug){
            this.socket.sendMessage("login",{ rid: rid,userType: "pc" },this.revLogin,this);
        }else{
            this.socket.sendMessage("login",{ rid: rid},this.revLogin,this);
        }
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
        //判断当前人数
        var userManager: UserManager = UserManager.getInstance();
        if(userManager.isOverUserLimit()){
            egret.log("超出人数");
            return;
        }
        //添加用户信息
        var userVO:UserVO = new UserVO();
        userVO.openid = data.openid;
        userVO.headUrl = data.headUrl;
        userVO.nickName = data.nickName;
        userManager.addUser(userVO);
        
        //添加用户头像
        for(var i=0;i<3;i++){
            var headUI: HeadUI = this.headList[i];
            if(headUI.isEmpty()){
                headUI.setUserInfo(userVO);
                userVO.role = i;
                 //发送用户角色
                this.sendRole(i);
                break;
            }
        }

        //如果是第一个人进入，则开始倒计时
        if(UserManager.getInstance().userList.length == 1){
            this.startCountDown();
        }else{
            //TODO 如果是其他人进入，则倒计时增加
            
        }  
    }
    
    //用户离开
    public revUserQuit(data){
        egret.log("rev userQuit:",data);
        var openid:string = data.openid;
        var gameScene: GameScene = GameManager.getInstance().gameScene;
        //如果是home场景
        if(this.parent){
            //清理用户列表
            var userManager: UserManager = UserManager.getInstance();
            userManager.deleteUser(openid);
            //清理用户头像
            for(var i=0;i<3;i++){
                var headUI:HeadUI = this.headList[i];
                if(headUI.openid == openid){
                    headUI.clear();
                }
            }
            //TODO 如果没人则停止计时
            if(UserManager.getInstance().userList.length == 0){
                this.stopCountDown();
                
            }
        }else if(gameScene.parent){
            //TODO 如果是游戏场景，则删除用户
        }
        
    }
    
    //发送开始校准
    private sendStartLock(){
        egret.log("sendStartLock");
        this.socket.sendMessage("startLock");
    }
   
    //发送分配角色
    private sendRole(roleType:number){
        egret.log("assignRole");
        this.socket.sendMessage("assignRole",{ roleType:roleType});
    }
}















