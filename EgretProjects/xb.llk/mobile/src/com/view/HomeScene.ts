/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    public socket: ClientSocket;             //socket
    
    private danmuBtn:eui.Image;
    private toolBtn:eui.Image;
    private ruleBtn:eui.Image;
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initView();
    
 
    }

    public onEnable(): void {
        this.danmuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDanMuBtnTouch, this);
        this.toolBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToolBtnTouch, this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
    }

    public onRemove(): void {
        this.danmuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onDanMuBtnTouch,this);
        this.toolBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onToolBtnTouch,this);
        this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRuleBtnTouch,this);
    }

    private initView():void{
      

    }
    
    private onDanMuBtnTouch():void{
        
    }
    
    private onToolBtnTouch(): void {

    }
    
    private onRuleBtnTouch(): void {

    }
    
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////

    
    //-----------------------------接收数据----------------------------------
    
    //接收用户自己数据
    public revUserInfo(data):void{
        var id:string = data.id;
        var avatar:string = data.avatar;
        var name:string = data.name;
    }
    
    //过关后，接收新关卡数据
    public revMapData(data): void {
        var mapData = data.mapdata;
        egret.log("下一关");
        //第一次接收，则是开始游戏
        MapManager.getInstance().level = mapData;
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
    //-----------------------------发送数据----------------------------------
    public sendDanMu(msg:string):void{
        var json = {"msg":msg};
        this.socket.sendMessage(NetConst.C2S_barrage, json);
    }
    
}















