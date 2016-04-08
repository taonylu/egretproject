/**
 * 简单按钮
 * @author 
 *
 */
class SimpleButton extends BaseUI{
    private up:eui.Image;
    private down:eui.Image;
	public constructor() {
    	super("SimpleButtonSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.touchEnabled = true;
        this.up.visible = true;
        this.down.visible = false;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }
    
    private onTouchBegin(){
        this.down.visible = true;
        this.up.visible = false;
    }
    
    private onTouchEnd() {
        this.down.visible = false;
        this.up.visible = true;
    }
    
    public devieceDown(){
        var self:SimpleButton = this;
        this.up.visible = false;
        this.down.visible = true;
        egret.Tween.get(this).wait(150).call(function(){
            self.up.visible = true;
            self.down.visible = false;
        },this);
    }
	
}
