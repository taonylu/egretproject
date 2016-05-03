/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private socket:ClientSocket;      //socket
    private rid:string;               //房间号
    
    private countDownTimer:egret.Timer = new egret.Timer(1000);  //倒计时
    private countDownLimit:number = 1;
    private countDownLabel: eui.BitmapLabel; //倒计时文本

    private p1HeadUI:HeadUI;
    private p2HeadUI:HeadUI;
    private pHeadUIList;            //玩家头像group列表
    
    private codeGroup:eui.Group;    //二维码group 280x280
    
    private rankHeadList:Array<RankHeadUI> = new Array<RankHeadUI>(); //英雄榜列表
    private killHeadList:Array<KillHeadUI> = new Array<KillHeadUI>(); //击杀榜列表
    

    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.socket = ClientSocket.getInstance();
        //初始化玩家头像
        this.pHeadUIList = [this.p1HeadUI,this.p2HeadUI];
        //初始化英雄排行榜头像
        for(var i=0;i<5;i++){
            this.rankHeadList.push(this["rankHead" + i]);
        }
        //初始化击杀榜头像
        for(var i = 0;i < 5;i++) {
            this.killHeadList.push(this["killHead" + i]);
        }
    }

    public onEnable(): void {
        this.resetView();     //重置界面
        this.createQRCode();  //创建二维码
        this.startConnect();  //连接socket
    }

    public onRemove(): void {
        
    }
    
    //重置界面
    private resetView(){
        //重置倒计时
        this.countDownLabel.text = this.countDownLimit + "";
        //重置玩家头像
        for(var i=0;i<this.pHeadUIList.length;i++){
            var headUI:HeadUI = this.pHeadUIList[i];
            headUI.clear();
        }
        //重置英雄榜
        for(var i = 0;i < 5;i++) {
            //this.rankHeadList[i].clear();
        }
        //重置击杀榜头像
        for(var i = 0;i < 5;i++) {
           // this.killHeadList[i].clear();
        }
    }
    
    //开始游戏
    private startGame(){
        this.sendStartGame();
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
    //开始倒计时
    private startCountDown(){
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler,this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    }
    
    //倒计时处理
    private onCountDownHandler(){
        var count = this.countDownLimit - this.countDownTimer.currentCount;
        this.countDownLabel.text = count + "";
        if(count <= 0){
            this.stopCountDown();
            this.startGame();
        }
    }
    
    //停止倒计时
    private stopCountDown(){
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler,this);
        this.countDownTimer.stop();
    }
    
    //创建二维码
    private createQRCode(){
        this.rid = window["createQRCode"]();
        
        var codeLoader: QRCodeLoader = new QRCodeLoader();
        var codeConfig = window["codeConfig"];
        codeLoader.load(codeConfig.codeData,codeConfig.codeWidth,codeConfig.codeHeight,codeConfig.logoUrl);
        this.codeGroup.addChild(codeLoader);
        
        this.sendUpRid();
    }
    
    //开始连接socket
    private startConnect(){
        if(this.socket.isConnected() == false){
            this.socket.startConnect();
        }
    }
    
    //socket连接成功
    public connect(){
        this.sendLogin();
    }
    
    //发送登录请求
    private sendLogin(){
        console.log("send login:","rid=" + this.rid);
        this.socket.sendMessage("login",{rid:this.rid,userType:"pc"},this.revLogin,this);
    }
    
    //接收登录
    private revLogin(data){
        var success:boolean = data.success;
        var msg:string = data.msg;
        console.log("rev login:",data);
        if(success == false){
            alert(msg);
        }
    }
    
    //更新房间号，第一次进入homeScene时，socket尚未连接，所以并不会发送upRid，房间号在登录请求login中发送
    private sendUpRid(){
        console.log("send upRid:","rid=" + this.rid);
        this.socket.sendMessage("upRid",{rid:this.rid});
    }
    
    //发送游戏开始
    public sendStartGame() {
        console.log("send startGame");
        this.socket.sendMessage("startGame");
    }
    
    //接收用户加入
    public revUserJoin(data){
        console.log("rev userJoin:",data);
        var openid:string = data.openid;
        var headimgurl:string = data.headimgurl;
        var nickname:string = data.nickname;
        
        //保存用户列表
        var userVO:UserVO = new UserVO();
        userVO.openid = openid;
        userVO.headimgurl = headimgurl;
        userVO.nickname = nickname;
        UserManager.getInstance().addUser(userVO);
        
        //显示用户头像
        for(var i = 0;i < this.pHeadUIList.length;i++){
            var headUI:HeadUI = this.pHeadUIList[i];
            if(headUI.isEmpty()){
                headUI.loadImg(headimgurl);
                headUI.openid = openid;
            }
        }
        
        //开始倒计时
        this.startCountDown();   
    }
    
    //接收用户离开
    public revUserQuit(data){
        console.log("rev userQuit:",data);
        var openid:string = data.openid;
        
        //从用户列表中删除
        UserManager.getInstance().deleteUser(openid);
    } 
    
    
}















