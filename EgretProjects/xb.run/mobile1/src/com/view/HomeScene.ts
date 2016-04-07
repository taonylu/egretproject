/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{

    private socket:ClientSocket ;
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.socket = ClientSocket.getInstance();
    }

    public onEnable(): void {
       
    }

    public onRemove(): void {
        
    }
    
    ////////////////////////////////////////////////////////////
    //------------------------[Socket通讯]----------------------
    ////////////////////////////////////////////////////////////
    
    //发送登录
    public sendLogin() {
        var rid = window["gameConfig"].rid;
        egret.log("send login:",rid,"userType:mobile");
        this.socket.sendMessage("login",{ rid: "1",userType: "mobile" },this.revLogin,this);
        
        if(GameConst.debug){
            LayerManager.getInstance().runScene(GameManager.getInstance().gameScene); 
        }
    }
    
    //接收登录
    private revLogin(data) {
        egret.log("rev login1");
        var success:boolean = data.success;
        var msg:string = data.msg;
        
        if(success){
            //TODO 
        }else{
            //TODO 输出错误信息
        }
    }
    
    //接收开始校准
    public revStartLock(){
        egret.log("revStartLock");
        //TODO 显示校准按钮,校准后开始游戏
        //LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);  
    }
    
    

}















