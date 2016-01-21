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
    
    private toolGroup:eui.Group;    //道具说明
    private closeToolBtn:eui.Rect;  //关闭道具说明
    
    private queueGroup:eui.Group;       //排队Group
    private queueLabel:eui.BitmapLabel; //排队文本
    private joinBtn:eui.Image;    //加入游戏按钮
    private tipLabel:eui.Label;   //提示文本
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initView();
        
        
    }

    public onEnable(): void {
        //隐藏无用界面
        this.ruleGroup.visible = false;
        this.dmGroup.visible = false;
        this.queueGroup.visible = false;
        this.queueLabel.text = "";
        
        //监听
        this.showJoinBtn();
        this.dmLabel.prompt = "弹幕内容";
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
      
    }
    
     //显示加入游戏按钮
    private showJoinBtn(){
        this.joinBtn.visible = true;
        var self: HomeScene = this;
        this.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onJoinBtnTouch, this);
    }
    
    public onJoinBtnTouch() {
        if(this.socket && this.socket.isConnected()) {
            egret.log("发送用户准备");
            this.sendUserReady();
        } else { //用户断开连接，则重连
            egret.log("请求连接");
            GameManager.getInstance().bReconnect = true;
            this.socket.startConnect();
        }
    }
    
    private onDanMuBtnTouch():void{
        this.dmGroup.visible = true;
        this.sendDmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendDmBtnTouch, this);
        this.closeDmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseDmBtnTouch, this);
    }
    
    private onToolBtnTouch(): void {
        this.toolGroup.visible = true;
        this.closeToolBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseToolBtnTouch, this);
    }
    
    private onCloseToolBtnTouch(){
        this.toolGroup.visible = false;
        this.closeToolBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseToolBtnTouch,this);
    }
    
    private onRuleBtnTouch(): void {
        this.ruleGroup.visible = true;
        this.closeRuleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseRuleBtnTouch, this);
    }
    
    private onSendDmBtnTouch():void{
        this.dmGroup.visible = false;
        this.sendDanMu(this.dmLabel.text);
        this.dmLabel.text = "";
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
        this.socket.sendMessage("userReady");
    }
    
    
    
    
    //-----------------------------接收数据----------------------------------
    
    //接收排队信息
    public revQueue(data){
        var status:string = data.status; //"wait"、"ready"
        var queue: number = data.queue;  //排队位置
        egret.log("排队信息:" + status, queue);
        if(status == "wait"){  //排队
            this.queueGroup.visible = true;
            if(queue < 10){
                this.queueLabel.text = "0" + queue.toString(); 
            }else if(queue <=99){
                this.queueLabel.text = queue.toString();
            }else{
                this.queueLabel.text = "99";
            }
            this.tipLabel.text = "\n\n游戏已经开始,请排队等待\n\n您前面的人数";
        }else if(status == "ready"){  //用户准备好，等待游戏开始
            this.queueGroup.visible = true;
            this.tipLabel.text = "\n\n\n已经加入游戏\n\n请耐心等待其他玩家"; 
        }
        this.joinBtn.visible = false;
    }

    //过关后，接收新关卡数据
    public revMapData(data): void {
        var mapData = data.mapData;
        egret.log("下一关");
        console.log(mapData);
        //接收地图数据，则表示开始游戏
        MapManager.getInstance().level.length = 0;
        MapManager.getInstance().level.push(mapData[0],mapData[1],mapData[2]);
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
    
    
}















