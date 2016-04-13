/**
 * 消息弹框
 * @author 
 *
 */
class MessageBox extends BaseUI{
    private msgLabel:eui.Label;
    private closeBtn:eui.Image;
    
	public constructor() {
    	super("MessageBoxSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }
    
    private onTouchTap(){
        this.hide();
        this.dispatchEvent(new egret.Event("close"));
    }
    
    public showMsg(msg:string){
        this.msgLabel.text = msg;
        LayerManager.getInstance().popLayer.addChild(this);
    }
    
    public hide(){
        this.parent && this.parent.removeChild(this);
    }
}
