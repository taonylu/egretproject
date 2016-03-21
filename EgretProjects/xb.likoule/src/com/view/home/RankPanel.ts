/**
 * 排行榜
 * @author 
 *
 */
class RankPanel extends BaseUI{
    private closeBtn:eui.Image;
    
	public constructor() {
    	super("RankPanelSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
	}
	
    protected componentCreated(): void {
        super.componentCreated();
    }

    public onEnable() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
    }   

    public onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtnTouch,this);
    }
    
    private onCloseBtnTouch(){
        this.hide();
    }
}
