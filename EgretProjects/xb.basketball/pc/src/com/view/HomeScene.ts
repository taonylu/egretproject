/**
 * 主页场景
 * 二维码显示页面
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private codeLoader: QRCodeLoader = new QRCodeLoader();  //二维码
    private socket = ClientSocket.getInstance();            //Socket
    private rid:string;                                     //房间号
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        
    }

    public onEnable(): void {
        this.createQRCode();
        //this.submitRid();
        
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }

    public onRemove(): void {
        
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
        this.codeLoader.x = (GameConst.stage.stageWidth - codeWidth)/2;
        this.codeLoader.y = (GameConst.stage.stageHeight - codeHeight) / 2;
        this.addChild(this.codeLoader);
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
    }
    
    ///////////////////////////////////////////
    //----------------[接收数据]---------------
    ///////////////////////////////////////////
    
    //接收房间号是否正确
    private revSubmitRid(data){
        var bSuccess: Boolean = data.bSuccess;
        var msg: string = data.msg;
        
    }
    
    //接收开始游戏
    public revStartGame(){
        
    }
}















