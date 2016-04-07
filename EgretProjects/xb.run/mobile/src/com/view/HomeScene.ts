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
    
    
    
    

}















