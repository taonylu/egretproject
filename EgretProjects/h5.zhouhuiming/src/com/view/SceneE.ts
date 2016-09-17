/**
 * 场景E
 * @author 
 *
 */
class SceneE extends BaseScene {
    private starGroup: eui.Group;
    private title:eui.Image;
    private titlePos:number;
    private phoneBtn:eui.Image;
    
    public constructor() {
        super();
        this.skinName = "SceneESkin"
    }

    public onCreated(): void {
        this.titlePos = this.title.y;
        this.title.y = 0;
    }
    
    public onEnable(): void {
       
    }

    public onRemove(): void {

    }
    
    
    
    public startAnim(){
        this.playPhoneAnim();
        this.playTitleAnim();
        this.playStarAnim();
        this.isAnimDone = true;
    }
    
    public stopAnim(){
        egret.Tween.removeAllTweens();
    }
    
    private playStarAnim() {
        this.starGroup.alpha = 1;
        egret.Tween.get(this.starGroup,{ loop: true }).to({ alpha: 0 },500).to({ alpha: 1 },500);
    }
    
    private onTouch() {
       
    }
    
    private playTitleAnim() {
        this.title.y = 0;
        egret.Tween.get(this.title).to({ y: this.titlePos },500);
    }
    
    private playPhoneAnim() {
        this.phoneBtn.scaleX = 1;
        this.phoneBtn.scaleY = 1;
        egret.Tween.get(this.phoneBtn,{ loop: true }).to({ scaleX: 1.1,scaleY: 1.1 },500).to({ scaleX: 1,scaleY: 1 },500);
    }

}










