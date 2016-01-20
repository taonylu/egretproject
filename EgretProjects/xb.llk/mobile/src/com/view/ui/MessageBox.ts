/**
 * 消息框
 * @author 
 *
 */
class MessageBox extends BaseUI{
    
    private closeBtn:eui.Image;
    private msgLabel:eui.Label;
    
    private _msg:string = "";
    
	public constructor() {
    	super("MessageBoxSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.msgLabel.text = this._msg;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
    }
    
    public showMessage(msg:string){
        this._msg = msg;
        if(this.inited){
            this.msgLabel.text = msg;
        }
        LayerManager.getInstance().popLayer.addChild(this);
    }
    
    private onCloseTouch(){
        this.parent && this.parent.removeChild(this);
    }
}
