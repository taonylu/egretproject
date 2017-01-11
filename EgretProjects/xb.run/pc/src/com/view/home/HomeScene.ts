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
    
    private countDownGroup: eui.Group;  //倒计时Group
    private countDownTimer:egret.Timer = new egret.Timer(1000); //倒计时计时器
    private countDownLimit = 15;   //倒计时限制
    private countDownLabel:eui.EditableText; //倒计时文本

    private introduceGroup: eui.Group;  //简介Group
    private introduceLabel: eui.Label;  //简介文本
    
    private headList: Array<HeadUI> = new Array<HeadUI>();   //头像UI
    private head0:HeadUI;
    private head1:HeadUI;
    private head2:HeadUI;
    
    //private fengChe:eui.Image;  //风车
    
    private playerGroup: eui.Group; //演示动画用人物的Group
    private player:Player;          //演示动画用的人物
    private phone0:eui.Image;        //手机0
    private phone1:eui.Image;        //手机1 跳跃时
    private leftArrow:eui.Image;    //左箭头
    private rightArrow:eui.Image;   //右箭头
    
    private snd:SoundManager = SoundManager.getInstance();
    
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.socket = ClientSocket.getInstance();
        this.countDownLimit = GameConst.gameCofig.homeTime;
        this.initView();  
    }

    public onEnable(): void {
        window["changeBgColor"]("#35ed94");
        this.resetScene();    //重置场景
        this.snd.playBgm(this.snd.bgm_home);
        
    }

    public onRemove(): void {
        //this.stopFengAnim();
        this.snd.stopBgm();
    }
    
    //初始化视图
    private initView(){
        this.initHead();     //初始化头像相关
        
        //初始化倒计时和简介
        this.introduceGroup.visible = true;
        this.countDownGroup.visible = false;
        this.introduceLabel.text = GameConst.gameCofig.introduceText;
    }
    
    //重置场景
    private resetScene(){
        this.countDownLabel.text = "";
        this.createQRCode();      //创建二维码
        this.clearHead();         //清理头像
        this.clearUserManager();  //清理用户列表
        //this.startFengAnim();     //开始风车动画
        this.startPlayerAnim();   //播放人物动画
    }
    
    //风车动画
//    private startFengAnim(){
//        egret.Tween.get(this.fengChe,{loop:true}).to({rotation:360*5},2000*5)
//             .to({rotation:360*7},1000*2)
//            .to({ rotation: 360*8},1500);
//    }
    
    //停止风车动画
//    private stopFengAnim(){
//        egret.Tween.removeTweens(this.fengChe);
//    }
    
    //开始人物动画
    private startPlayerAnim(){
        if(this.player == null){
            this.player = new Player("player0_png","player0_json","player0");
            this.player.scaleX = 0.5;
            this.player.scaleY = 0.5;
            this.playerGroup.addChild(this.player);
        }
        var centerX: number = this.playerGroup.width / 2 - this.player.width / 2;
        var centerY: number = this.playerGroup.height / 2 - this.player.height / 2;
        this.player.x = centerX;
        this.player.y = centerY;
        this.player.run();
        egret.Tween.get(this.player,{ loop: true }).wait(1500).to({ x: - 80 },100).wait(1500) //左移
            .to({ x: centerX },100).wait(1500) //右移
            .to({ y: - 100 },200).to({ y: centerY},200); //跳跃 
        
        this.phone0.rotation = 0;
        this.phone0.visible = true;
        this.phone1.visible = false;
        var self:HomeScene = this;
        egret.Tween.get(this.phone0,{ loop: true }).wait(1500).to({ rotation: -30 },200).to({ rotation: 0 },200).wait(1200) //左移
        .to({rotation:30},200).to({rotation:0},200).wait(1200) //右移
        .call(function(){
            self.changePhoneVisible(false);
        }).wait(200).call(function(){
            self.changePhoneVisible(true);
        }).wait(200);
    }
    
    private changePhoneVisible(isPhone0:boolean){
        if(isPhone0){
            this.phone0.visible = true;
            this.phone1.visible = false;
        }else{
            this.phone0.visible = false;
            this.phone1.visible = true;
        }
    }
    
    //停止人物动画
    private stopPlayerAnim(){
        
    }
    
    //初始化头像相关
    private initHead(){
        this.headList.push(this.head1,this.head2,this.head0);
        this.head0.infoLabel.text = "选择暴躁鹿";
        this.head1.infoLabel.text = "选择嘻哈兔";
        this.head2.infoLabel.text = "选择悠悠熊猫";
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
        //index创建二维码图片
        this.rid = window["createQRCode"]();
        
        //加载二维码图片
        var codeLoader: QRCodeLoader = new QRCodeLoader();
        var gameConfig = GameConst.gameCofig;
        codeLoader.load(gameConfig.codeData,gameConfig.codeWidth,gameConfig.codeHeight,gameConfig.logoUrl);
        this.codeGroup.addChild(codeLoader);
        
        //更新rid
        egret.log("upRid:",this.rid);
        this.socket.sendMessage("upRid", {rid:this.rid});
    }
    
    //开始倒计时
    private startCountDown(){
        this.countDownGroup.visible = true;
        this.introduceGroup.visible = false;
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
        this.countDownLabel.text = this.countDownLimit + "";
    }
    
    //倒计时处理
    private onCountDownHandler(){
        var count =  this.countDownLimit - this.countDownTimer.currentCount;
        //显示倒计时
        this.countDownLabel.text = count + "";
        
        //倒计时结束，开始校准
        if(count <= 0){
           this.stopCountDown();
            LayerManager.getInstance().runScene(GameManager.getInstance().lockScene);
            this.sendStartLock();
        }
    }
    
    //停止倒计时
    private stopCountDown(){
        this.countDownGroup.visible = false;
        this.introduceGroup.visible = true;
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler,this);
        this.countDownTimer.stop();
    }
    
    /////////////////////////////////////////////////////////
    //-----------------[Socket 数据]-------------------------
    /////////////////////////////////////////////////////////
    //发送登录
    public sendLogin(){
        console.log("sendLogin：", this.rid);
        var rid = this.rid;
        if(GameConst.debug){
            this.socket.sendMessage("login",{ rid: rid,userType: "pc" },this.revLogin,this);
        }else{
            this.socket.sendMessage("login",{ rid: rid,userType:"pc"},this.revLogin,this);
        }
    }
    
    //接收登录
    private revLogin(data){
        console.log("rev login:",data);
        var success:boolean = data.success;
        var msg:string = data.msg;
        if(success){
            //TODO 登录成功提示
        }else{
            //TODO 登录失败提示
            alert(msg);
        }
    }
    
    //接收用户进入
    public revUserJoin(data){
        console.log("rev userJoin:",data);
        //判断当前人数
        var userManager: UserManager = UserManager.getInstance();
        if(userManager.isOverUserLimit()){
            egret.log("超出人数");
            return;
        }
        
        if(userManager.isExsit(data.openid)){
            egret.log("玩家已存在");
            return;
        }
        
        if(!this.parent){
            egret.log("游戏已开始");
            return;
        }
        
        if(GameConst.debug){
            data.headUrl = "resource/assets/home/home_player.png";
            data.nickName = "ABC";
        }
        
        //添加用户信息
        var userVO:UserVO = new UserVO();
        userVO.openid = data.openid;
        userVO.headUrl = data.headimgurl;
        userVO.nickName = data.nickname;
        userManager.addUser(userVO);
        
        //添加用户头像
        for(var i=0;i<3;i++){
            var headUI: HeadUI = this.headList[i];
            if(headUI.isEmpty()){
                headUI.setUserInfo(userVO);
                userVO.role = i;
                 //发送用户角色
                this.sendRole(userVO.role,userVO.openid);
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
        console.log("rev userQuit:",data);
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
                this.countDownLabel.text = "";
                for(var i=0;i<3;i++){
                    this.headList[i].clear();
                }
            }
        }else if(gameScene.parent){
            //TODO 如果是游戏场景，则删除用户
            gameScene.deleteUser(openid);
        }
        
    }
    
    //发送开始校准
    private sendStartLock(){
        console.log("sendStartLock");
        this.socket.sendMessage("startLock");
    }
   
    //发送分配角色
    private sendRole(roleType:number, openid:string){
        console.log("assignRole:","openid:",openid,"roleType:", roleType);
        this.socket.sendMessage("assignRole",{ roleType:roleType, openid:openid});
    }
}















