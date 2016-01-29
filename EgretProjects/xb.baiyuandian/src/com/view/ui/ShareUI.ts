/**
 * 分享UI
 * @author 
 *
 */
class ShareUI extends BaseUI{
	public constructor() {
        super("ShareUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.touchEnabled = true;
       this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }
    
    private onTouchTap(){
        this.parent && this.parent.removeChild(this);
    }
}
