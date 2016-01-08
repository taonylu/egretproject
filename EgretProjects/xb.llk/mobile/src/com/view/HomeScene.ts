/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    public socket: ClientSocket;             //socket
    private userMax:number = 8;              //用户最大数量
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initView();
    
 
    }

    public onEnable(): void {
    }

    public onRemove(): void {

    }

    private initView():void{
      

    }


    //接收用户自己数据
    public revUserInfo(data):void{
        var id:string = data.id;
        var avatar:string = data.avatar;
        var name:string = data.name;
    }
    
    
    
    
}















