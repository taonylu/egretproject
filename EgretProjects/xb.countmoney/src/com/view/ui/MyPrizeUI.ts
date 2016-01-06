/**
 *
 * @author 
 *
 */
class MyPrizeUI extends BaseUI{
    private contentLabel:eui.Label;
    private okBtn:eui.Rect;
    
	public constructor() {
    	super("MyPrizeUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
    
    public show(msg:string):void{
        this.contentLabel.text = msg;
        LayerManager.getInstance().popLayer.addChild(this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
    }
    
    private onOKBtnTouch():void{
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOKBtnTouch,this);
        this.parent && this.parent.removeChild(this);
    }
}
