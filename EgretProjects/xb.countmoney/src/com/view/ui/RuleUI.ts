/**
 *
 * @author 
 *
 */
class RuleUI  extends BaseUI{
    private scroller:eui.Scroller;
    private okBtn:eui.Image;
    
	public constructor() {
    	super("RuleUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        //需要修改引擎源码，达到长久显示滑块目的
        this.scroller.scrollPolicyV = eui.ScrollPolicy.ON;
    }
    
    public show():void{
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkBtnTouch, this);
        LayerManager.getInstance().popLayer.addChild(this);
    }
    
    private onOkBtnTouch():void{
        this.parent&&this.parent.removeChild(this);
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOkBtnTouch,this);
        this.scroller.viewport.scrollV = 0;
    }
    
}
