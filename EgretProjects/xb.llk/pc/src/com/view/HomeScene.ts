/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private msgLabel: eui.Label;    //测试用输出信息
    
    private socket: ClientSocket;   //socket
    
    public constructor(skinName) {
        super(skinName);
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.socket = ClientSocket.getInstance();
    }

    public onEnable(): void {
        
    }

    public onRemove(): void {
        
    }
    
    //设置测试用文本
    public setMsgLabel(msg: string) {
        this.msgLabel.text = msg;
    }
    
    
    //返回大屏幕准备
    public revScreenReady(data) {
        var status: Number = data.status;
        var msg: string = data.msg;
        if(status == 1) { //验证成功
            
        } else if(status == 0) {  //验证失败
            
        }
        this.setMsgLabel(msg);
    }
    
    //玩家加入
    public revUserJoin(data): void {
        var avatar: string = data.avatar;  //用户头像
        var name: string = data.name;      //用户名
        var id: string = data.id;          //用户id
    }
    
    //玩家退出
    public revUserQuit(data): void {
        var id: string = data.id;  //用户id
    }

    //游戏开始
    public revGameStart(data):void {
        var mapData:any = data.mapData;        //地图信息
        var luckyUser:string = data.luckyUser; //大屏幕显示的用户
        
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
        
    }
    
    
 
    
}















