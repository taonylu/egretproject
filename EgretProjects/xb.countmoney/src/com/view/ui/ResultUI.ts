/**
 * 结果UI
 * @author 
 *
 */
class ResultUI extends BaseUI{
    private againBtn:eui.Rect;      //再拆一次
    private shareBtn:eui.Rect;      //分享
    private openPacketBtn:eui.Rect; //去拆红包
    private prizeBtn:eui.Rect;      //我的奖品
    private initShareBtnY:number;   //分享按钮初始位置
    
	public constructor() {
        super("ResultUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initShareBtnY = this.shareBtn.y;
    }
    
    public showInScene(doc:egret.DisplayObjectContainer, totalPacket:number): void {
        doc.addChild(this);
        
        //分享按钮动画
        egret.Tween.get(this.shareBtn,{loop:true}).to({y:this.initShareBtnY + 15},500).to({y:this.initShareBtnY},500);
        
        //监听
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.openPacketBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenBtnTouch,this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
        this.prizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPrizeBtnTouch,this);
    }
    
    public hide(): void {
        //从场景移除
        this.parent && this.parent.removeChild(this);
        
        //停止分享按钮动画
        egret.Tween.removeTweens(this.shareBtn);
        
        //移除监听
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
        this.openPacketBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenBtnTouch,this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
        this.prizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPrizeBtnTouch,this);
    }
    
    //再拆一次
    private onAgainBtnTouch():void{
        this.hide();
        GameManager.getInstance().gameScene.startGame();
    }
    
    //去拆红包
    private onOpenBtnTouch(): void {
        
    }
    
    //分享按钮
    private onShareBtnTouch(): void {
        GameManager.getInstance().shareUI.show();
    }
    
    //我的奖品
    private onPrizeBtnTouch(): void {

    }
    
    
}
















