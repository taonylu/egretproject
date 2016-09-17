/**
 * 场景E
 * @author 
 *
 */
class SceneF extends BaseScene {
    private starGroup: eui.Group;
    private title: eui.Image;
    private titlePos: number;
    private arrow: eui.Image;
    private arrowPos: number;

    public constructor() {
        super();
        this.skinName = "SceneFSkin"
    }

    public onCreated(): void {
        this.titlePos = this.title.y;
        this.arrowPos = this.arrow.y;
        this.title.y = 0;
    }

    public onEnable(): void {

    }

    public onRemove(): void {

    }



    public startAnim() {
        this.playTitleAnim();
        this.playStarAnim();
        this.playArrow();
        this.isAnimDone = true;
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
        egret.Tween.get(this.title).to({ y: this.titlePos },1000);
    }

    private playArrow() {
        this.arrow.y = this.arrowPos;
        egret.Tween.get(this.arrow,{ loop: true }).to({ y: this.arrowPos - 10 },300).to({ y: this.arrowPos },300);
    }
}










