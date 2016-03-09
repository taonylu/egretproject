/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{

    private socket:ClientSocket = ClientSocket.getInstance();
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }

    public onEnable(): void {
        this.createQRCode();
        this.sendLogin();
        
    }

    public onRemove(): void {
        
    }
    
    private createQRCode(){
        var codeLoader: QRCodeLoader = new QRCodeLoader();
        codeLoader.load(window["dataUrl"],window["codeWidth"],window["codeHeight"],window["logoUrl"]);
        codeLoader.x = (GameConst.stage.stageWidth - window["codeWidth"]) / 2;
        codeLoader.y = (GameConst.stage.stageHeight - window["codeHeight"]) / 2;
        this.addChild(codeLoader);
    }
    
    public sendLogin(){
        var rid = window["rid"];
        this.socket.sendMessage("login",{rid:rid,userType:"pc"},this.revLogin,this);
    }
    
    private revLogin(data){
        var success:boolean = data.success;
        egret.log("rev login:",success);
    }
    
    public revUserJoin(){
        egret.log("rev userJoin");
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }


   
}















