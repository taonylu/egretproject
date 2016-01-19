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
    
    private queueLabel:eui.BitmapLabel; //排队文本
    private joinBtn:eui.Image;    //加入游戏按钮
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initView();
        
        
    }

    public onEnable(): void {
        
        this.showJoinBtn();
        
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
    
    public reset(){
        
    }

    private initView():void{
      this.ruleGroup.visible = false;
      this.dmGroup.visible = false;
      this.queueLabel.text = "";
    }
    
     //显示加入游戏按钮
    private showJoinBtn(){
        this.joinBtn.visible = true;
        var self: HomeScene = this;
        this.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            self.sendUserReady();
        },this);
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
        this.dmGroup.visible = false;
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
    
    
    public sendDanMu(msg: string): void {
        egret.log("发送弹幕:" + msg);
        var json = { "msg": msg };
        this.socket.sendMessage(NetConst.C2S_barrage,json);
    }
    
    public sendUserReady(){
        egret.log("发送用户准备");
        this.socket.sendMessage("userReady");
       
    }
    
    
    //-----------------------------接收数据----------------------------------
    
    //接收排队信息
    public revQueue(data){
        var status:string = data.status; //"wait"、"ready"
        var queue: number = data.queue;  //排队位置
        egret.log("排队信息:" + status, queue);
        if(status == "wait"){  //排队
            if(queue < 10){
                this.queueLabel.text = "0" + queue.toString(); 
            }else if(queue <=99){
                this.queueLabel.text = queue.toString();
            }else{
                this.queueLabel.text = "99";
            }
            
        }else if(status == "ready"){  //用户准备好，等待游戏开始
            
        }
        this.joinBtn.visible = false;
    }

    //过关后，接收新关卡数据
    public revMapData(data): void {
        var mapData = data.mapData;
        egret.log("下一关");
        //接收地图数据，则表示开始游戏
        MapManager.getInstance().level.length = 0;
        MapManager.getInstance().level.push(mapData[0],mapData[1],mapData[2]);
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
    
    
}















