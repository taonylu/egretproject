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
    
    private ball:eui.Image;
    private hand:eui.Image;
    private handPosY:number;    //手和球初始坐标
    private ballPosX:number;
    private ballPosY:number;
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.handPosY = this.hand.y;
        this.ballPosX = this.ball.x;
        this.ballPosY = this.ball.y;  
    }

    public onEnable(): void {
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
        egret.Tween.get(this.hand,{ loop: true }).to({ y: this.handPosY - 50 },500).to({ y: this.handPosY},500).wait(500);
        
        egret.Tween.get(this.ball,{loop:true}).wait(100).to({y:this.ballPosY-100},100).
            to({ y: this.ballPosY - 150,x: this.ballPosX - 15 },100).
            to({ y: this.ballPosY - 200,x: this.ballPosX - 20 },100).
            to({ y: this.ballPosY - 250,x: this.ballPosX - 25 },100).
            to({ y: this.ballPosY - 300,x: this.ballPosX - 50 },100).
            to({ y: this.ballPosY - 350,x: this.ballPosX - 75 },100).
            to({ y: this.ballPosY - 400,x: this.ballPosX - 100 },100).
            to({ y: this.ballPosY - 350,x: this.ballPosX - 125 },100).
            to({ y: this.ballPosY - 300,x: this.ballPosX - 150 },100).
            wait(500);
    }
    
    private stopShootAnim(){
        egret.Tween.removeTweens(this.ball);
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
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
}















