/**
 * 分享界面
 * @author 
 *
 */
class SharePanel extends BaseUI{
    private arrowGroup:eui.Group;
    
	public constructor() {
        super("SharePanelSkin");
	}
	
    protected componentCreated(): void {
        super.componentCreated();
        this.percentWidth = 100;
        this.percentHeight = 100;
    }

    public onEnable() {
        if(GameConst.orientation == 0){
            this.arrowGroup.scaleX = -1;
        }else{
            this.arrowGroup.scaleX = 1;
        }
        
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public onRemove() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
    }
	
    private onTouch(){
        this.hide();
    }
}
