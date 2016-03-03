/**
 * 主页场景
 * 二维码显示页面
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private codeLoader: QRCodeLoader = new QRCodeLoader();  //二维码
    private codeGroup:eui.Group;                            //二维码容器
    
    private socket = ClientSocket.getInstance();            //Socket
    private rid:string;                                     //房间号
    
    private soundManager:SoundManager = SoundManager.getInstance();
    
    private ball:eui.Image;
    private hand:eui.Image;
    private handPosY:number;    //手和球初始坐标
    private ballPosX:number;
    private ballPosY:number;
    
    private arc:ArcMotion;
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.handPosY = this.hand.y;
        this.ballPosX = this.ball.x;
        this.ballPosY = this.ball.y;  
        
        //初始化篮球弧度动画
        var p0: egret.Point = new egret.Point(this.ballPosX,this.ballPosY);
        var p1: egret.Point = new egret.Point(this.ballPosX - 60,this.ballPosY - 480);
        var p2: egret.Point = new egret.Point(this.ballPosX - 165,this.ballPosY - 250);
        this.arc = new ArcMotion(this.ball,p0,p1,p2,1500,true);
    }

    public onEnable(): void {
        this.soundManager.playBgm(this.soundManager.bgm_home);
        this.createQRCode();
        this.submitRid(); 
        this.shootAnim();
    }

    public onRemove(): void {
        this.stopShootAnim();
        this.codeLoader.destroy();
    }

    private createQRCode(){
        //随机rid，当前时间加上随机6位数验证码
        this.rid = (new Date()).getTime() + NumberTool.getVerificationCode(6);
        
        //index创建二维码图片
        window["createQRCode"](this.rid);
        
        //加载二维码图片
        var dataUrl = window["dataUrl"];
        var codeWidth = window["codeWidth"];
        var codeHeight = window["codeHeight"];
        var logoUrl = window["logoUrl"];
        this.codeLoader.load(dataUrl,codeWidth,codeHeight,logoUrl);
        this.codeGroup.addChild(this.codeLoader);
    }
    
    private shootAnim(){
        egret.Tween.get(this.hand,{ loop: true }).to({ y: this.handPosY - 50 },300).to({ y: this.handPosY},300).wait(900);

        this.arc.play();
    }
    
    private stopShootAnim(){
        this.arc.stop();
        egret.Tween.removeTweens(this.hand);
        this.ball.x = this.ballPosX;
        this.ball.y = this.ballPosY;
        this.hand.y = this.handPosY;
    }
    
    ///////////////////////////////////////////
    //----------------[发送数据]---------------
    ///////////////////////////////////////////
    
    //提交房间号
    public submitRid(){
        if(this.socket.isConnected()){  //首次进入游戏，socket并未连接，不需要提交房间号
            var json = {"rid":this.rid};
            this.socket.sendMessage("submitRid", json, this.revSubmitRid,this);
        }
        
        if(GameConst.isDebug){
            this.revSubmitRid({bSuccess:true,msg:"房间已存在"});
            this.revStartGame();
        }
    }
    
    ///////////////////////////////////////////
    //----------------[接收数据]---------------
    ///////////////////////////////////////////
    
    //接收房间号是否正确
    private revSubmitRid(data){
        var bSuccess: Boolean = data.bSuccess;
        var msg: string = data.msg;
        egret.log("revSubmitRid:",bSuccess,msg);
        if(bSuccess){
            
        }else{
            GameManager.getInstance().messageBox.showMessage(msg);
        }
    }
    
    //接收开始游戏
    public revStartGame(){
        egret.log("rev startGame");
        var gameScene:GameScene = GameManager.getInstance().gameScene;
        if(!gameScene.parent){
            LayerManager.getInstance().runScene(gameScene);
        }
        
    }
}















