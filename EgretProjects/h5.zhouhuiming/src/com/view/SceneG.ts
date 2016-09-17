/**
 * 场景E
 * @author 
 *
 */
class SceneG extends BaseScene {
    private starGroup: eui.Group;
    private title: eui.Image;
    private titlePos: number;
    private submitBg:eui.Image;
    private submitBtn:eui.Image;
    private tree:eui.Image;

    public constructor() {
        super();
        this.skinName = "SceneGSkin"
    }

    public onCreated(): void {
        this.titlePos = this.title.y;
        this.title.y = 0;
        this.tree.alpha = 0;
        this.submitBg.alpha = 0;
        this.submitBtn.alpha = 0;
    }

    public onEnable(): void {

    }

    public onRemove(): void {

    }



    public startAnim() {
        this.playTitleAnim();
        this.playStarAnim();
        this.isAnimDone = true;
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmit, this);
    }
    
    private onSubmit(){
        alert("本作品是测试demo，提交无效");
    }

    public stopAnim() {
        egret.Tween.removeAllTweens();
    }

    private playStarAnim() {
        this.starGroup.alpha = 1;
        egret.Tween.get(this.starGroup,{ loop: true }).to({ alpha: 0 },500).to({ alpha: 1 },500);
    }

    private playTitleAnim() {
        this.title.y = 0;
        egret.Tween.get(this.title).to({ y: this.titlePos },500);
        
        this.submitBg.alpha = 0;
        egret.Tween.get(this.submitBg).wait(500).to({alpha:1},500);
        
        this.tree.alpha = 0;
        egret.Tween.get(this.tree).wait(1000).to({ alpha:1},500);
        
        this.submitBtn.alpha = 0;
        egret.Tween.get(this.submitBtn).wait(1500).to({ alpha: 1 },500);
            
        this.submitBtn.scaleX = 1;
        this.submitBtn.scaleY = 1;
        egret.Tween.get(this.submitBtn,{ loop: true }).wait(2000).to({ scaleX: 1.1,scaleY: 1.1 },500).to({ scaleX: 1,scaleY: 1 },500);
    }
}










