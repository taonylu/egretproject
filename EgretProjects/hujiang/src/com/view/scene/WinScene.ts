/**
 *
 * @author 
 *
 */
class WinScene extends BaseScene{
    
    private scoreLabel: eui.Label;
    private shareBtn: eui.Image;
    private againBtn: eui.Image;
    private shareHand: eui.Image;
    private shareBg: eui.Image;
    
	public constructor() {
        super("resource/myskin/scene/WinSceneSkin.exml");
	}
	
    public onEnable(): void {
        this.shareHand.parent && this.removeChild(this.shareHand);
        this.shareBg.parent && this.removeChild(this.shareBg);
        this.setScoreLabel(GameManager.getInstance().gameScene.score);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
    }
    
    public onRemove(): void {
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
    }
    
    public setScoreLabel(score: number): void {
        this.scoreLabel.text = score.toString();
    }
    
    private onShareBtnTouch(): void {
        this.addChild(this.shareBg);
        this.addChild(this.shareHand); 
        this.shareBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBgTouch,this);
    }
    
    private onShareBgTouch(): void {
        this.shareBg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBgTouch,this);
        this.removeChild(this.shareBg);
        this.removeChild(this.shareHand);
        
    }
    
    private onAgainBtnTouch(): void {
        LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
    }
}







