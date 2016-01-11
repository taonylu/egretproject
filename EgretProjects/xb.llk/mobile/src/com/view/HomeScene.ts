/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    public socket: ClientSocket;   //socket
    
    private dmGroup:eui.Group;     //弹幕Group
    private ruleGroup:eui.Group;   //规则Group
    
    private danmuBtn:eui.Image;    //打开弹幕弹框
    private toolBtn:eui.Image;     //道具说明
    private ruleBtn:eui.Image;     //游戏规则
    
    private sendDmBtn:eui.Rect;    //发送弹幕
    private dmLabel:eui.EditableText; //弹幕文本
    private closeDmBtn:eui.Rect;   //关闭弹幕框
    private closeRuleBtn:eui.Rect; //关闭规则
    
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
        this.dmGroup.visible = false;
        this.ruleGroup.visible = false;
    }

    private initView():void{
      this.ruleGroup.visible = false;
      this.dmGroup.visible = false;

    }
    
    private onDanMuBtnTouch():void{
        this.dmGroup.visible = true;
        this.sendDmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendDmBtnTouch, this);
        this.closeDmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseDmBtnTouch, this);
    }
    
    private onToolBtnTouch(): void {
        
    }
    
    private onRuleBtnTouch(): void {
        this.ruleGroup.visible = true;
        this.closeRuleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseRuleBtnTouch, this);
    }
    
    private onSendDmBtnTouch():void{
        this.sendDanMu(this.dmLabel.text);
    }
    
    private onCloseDmBtnTouch():void{
        this.dmGroup.visible = false;
        this.sendDmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSendDmBtnTouch,this);
        this.closeDmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseDmBtnTouch,this);
    }
    
    private onCloseRuleBtnTouch():void{
        this.ruleGroup.visible = false;
        this.closeRuleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRuleBtnTouch,this);
    }
    
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    
    //-----------------------------发送数据----------------------------------
    
    public sendLogin():void{
        var json = { "licence": egret.getOption("licence")};
        this.socket.sendMessage(NetConst.C2S_login, json);
    }
    
    public sendDanMu(msg: string): void {
        egret.log("发送弹幕:" + msg);
        var json = { "msg": msg };
        this.socket.sendMessage(NetConst.C2S_barrage,json);
    }
    
    
    
    //-----------------------------接收数据----------------------------------
    
    //接收用户自己数据
    public revUserInfo(data):void{
        var id:string = data.id;
        var avatar:string = data.avatar;
        var name:string = data.name;
        egret.log("用户信息:",id, avatar, name);
    }
    
    //过关后，接收新关卡数据
    public revMapData(data): void {
        var mapData = data.mapdata;
        egret.log("下一关");
        //第一次接收，则是开始游戏
        MapManager.getInstance().level = mapData;
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
    
    
}















