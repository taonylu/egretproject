/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    public socket: ClientSocket;             //socket
    
    private userGroup:eui.Group;             //用户Group
    private headUIList:Array<HeadUI>;        //头像数组
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
        //初始头像
        this.headUIList = new Array<HeadUI>();
        for(var i: number = 0;i < this.userMax;i++) {
            this.headUIList.push(this["headUI" + i]);
        }

    }
    
    //返回登录成功
    public revLoginComplete(data) {
        var status: Number = data.status;
        var msg: string = data.msg;
        egret.log("loginComplete:" ,status,msg);
        if(status == 1) { //验证成功
            
        } else if(status == 0) {  //验证失败
            
        }
    }
    
    //玩家加入
    public revUserJoin(data): void {
        var avatar: string = data.avatar;  //用户头像
        var name: string = data.name;      //用户名
        var id: string = data.id;          //用户id
        egret.log("玩家加入,链接:" + avatar, "名字:" + name,"ID:" +  id);
        
        //设置用户名，选取一个空文本。因为可能出现靠前的玩家退出游戏。
        var index:number = -1;
        for(var i:number = 0;i<this.userMax;i++){
            if(this.headUIList[i].isEmpty()){
                this.headUIList[i].setNameLabel(name);
                this.headUIList[i].loadImg(avatar);
                break;
            }
        }
    }

    //玩家退出
    public revUserQuit(data): void {
        var id: string = data.id;  //用户id
        
        //删除玩家头像
        for(var i:number=0; i<this.userMax;i++){
            if(this.headUIList[i].userID == id){
                this.headUIList[i].clear();
            }
        }
        
        //TODO 游戏中玩家退出，可能是大屏用户
    }

    //游戏开始
    public revGameStart(data):void {
        var mapData:any = data.mapData;        //地图信息
        var luckyUser:string = data.luckyUser; //大屏幕显示的用户
        
        egret.log("游戏开始，幸运用户:",luckyUser);
        
        MapManager.getInstance().level = mapData;
        
        UserManager.getInstance().luckyUser = luckyUser;
        
        //跳转场景
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
        
    }
    
    
 
    
}















