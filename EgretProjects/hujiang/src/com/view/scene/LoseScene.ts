/**
 *
 * @author 
 * 失败场景
 */
class LoseScene extends BaseScene{
    private linkBtn: eui.Image;
    private againBtn: eui.Image;
    
	public constructor() {
        super("resource/myskin/scene/LoseSceneSkin.exml");
	}
	
    public onEnable(): void {
        this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLinkBtnTouch,this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
    }
    
    public onRemove(): void {
        this.linkBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLinkBtnTouch,this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
    }
    
    private onLinkBtnTouch(): void {
        alert("点击链接");
    }
    
    private onAgainBtnTouch(): void {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
}
