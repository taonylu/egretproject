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
    
    private qrcodeGroup:eui.Group;
    
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
        //生成二维码
        var qrcdeLoader:QRCodeLoader = new QRCodeLoader();
        qrcdeLoader.load(window["qrcodeUrl"], 400,400, window["logoUrl"]);
        this.qrcodeGroup.addChild(qrcdeLoader);
    }
    
     ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    
    //-----------------------------发送数据----------------------------------
    

    
    //-----------------------------接收数据----------------------------------
    
    //返回登录成功
    public revLogin(data) {
        var status: Number = data.status; //  -1 房间已经存在 ， 0 房间错误， 1 开放成功

        egret.log("登录成功，是否授权成功" ,status);
        if(status == 1) { //验证成功
            
        } else if(status == 0) {  //验证失败
            
        }
    }
    
    //玩家加入
    public revUserJoin(data): void {
        var avatar: string = data.avatar;  //用户头像
        var name: string = data.name;      //用户名
        var uid: string = data.uid;        //用户id
        egret.log("玩家加入,头像:" + avatar,"名字:" + name,"ID:" + uid);
        
        //设置用户名，选取一个空文本。因为可能出现靠前的玩家退出游戏。
        var index:number = -1;
        var headUI:HeadUI;
        for(var i:number = 0;i<this.userMax;i++){
            headUI = this.headUIList[i];
            if(headUI.isEmpty()){
                headUI.userID = uid;
                headUI.setNameLabel(name);
                headUI.loadImg(avatar);
                break;
            }
        }
        
        //保存用户
        var userVO: UserVO = new UserVO();
        userVO.uid = uid;
        userVO.name = name;
        userVO.headImg = new egret.Bitmap(headUI.headImg.bitmapData);
        UserManager.getInstance().userList[uid] = userVO;
    }

    //玩家退出
    public revUserQuit(data): void {
        var uid: string = data.uid;  //用户id
        egret.log("玩家退出:",uid);
        //删除玩家头像
        for(var i:number=0; i<this.userMax;i++){
            if(this.headUIList[i].userID == uid){
                this.headUIList[i].clear();
            }
        }
        //删除用户
        delete UserManager.getInstance().userList[uid];
        
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















