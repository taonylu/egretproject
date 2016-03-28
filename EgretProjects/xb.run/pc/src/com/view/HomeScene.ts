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
    
    //发送登录
    public sendLogin(){
        egret.log("sendLogin：", this.rid);
        var rid = this.rid;
        this.socket.sendMessage("login",{rid:rid,userType:"pc"},this.revLogin,this);
    }
    
    //接收登录
    private revLogin(data){
        var success:boolean = data.success;
        egret.log("rev login:",success);
    }
    
    //接收用户进入
    public revUserJoin(){
        egret.log("rev userJoin");
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }


   
}















