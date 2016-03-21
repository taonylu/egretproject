/**
 * 获奖列表
 * @author 
 *
 */
class PrizePanel extends BaseUI{
    private prizeLabel:eui.Label;   //获奖列表文本
    private closeBtn:eui.Image;     //关闭
    private leaderBtn:eui.Image;    //队长来领
    
	public constructor() {
    	super("PrizePanelSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
	}
	
    protected componentCreated(): void {
        super.componentCreated();
    }

    public onEnable() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.leaderBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaderBtnTouch, this);
    }

    public onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtnTouch,this);
        this.leaderBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLeaderBtnTouch,this);
    }
    
    private onCloseBtnTouch(){
        this.hide();
    }
    
    private onLeaderBtnTouch(){
        //TODO 队长来领奖
    }
}








