/**
 *
 * @author 
 *  人物界面
 */
class RoleScene extends BaseScene{
    private ring1: eui.Image;
    private ring2: eui.Image;
    private okBtn: eui.Image;
    private noBtn: eui.Image;
    
	public constructor() {
        super("resource/myskin/scene/RoleSceneSkin.exml");
	}
	
    public onEnable(): void {
        this.ringAnimFast();
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOkBtnTouch,this);
        this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNoBtnTouch,this);
    }
    
    public onRemove(): void {
        egret.Tween.removeAllTweens();
        this.ring1.rotation = 0;
        this.ring2.rotation = 0;
    }
    
    private onOkBtnTouch(): void {
        LayerManager.getInstance().runScene(GameManager.getInstance().introduceScene);
    }
    
    private onNoBtnTouch(): void {
        LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
    }
	
    private ringAnimFast(): void {
        var self: RoleScene = this;
        egret.Tween.get(this.ring1).to({ rotation: this.ring1.rotation + 300 },1000);
        egret.Tween.get(this.ring2).to({ rotation: this.ring2.rotation + 270 },1000).call(function() {
            self.ringAnimSlow();
        });
    }
    
    private ringAnimSlow(): void {
        var self: RoleScene = this;
        egret.Tween.get(this.ring1).to({ rotation: this.ring1.rotation + 320 },2000);
        egret.Tween.get(this.ring2).to({ rotation: this.ring2.rotation + 270 },2000).call(function() {
            self.ringAnimFast();
        });
    }
	
}
