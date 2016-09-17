/**
 * 场景C
 * @author 
 *
 */
class SceneC extends BaseScene {
    private starGroup:eui.Group;
    private phoneBtn:eui.Image;
    private title:eui.Image;
    private titlePos:number;
    
    public constructor() {
        super();
        this.skinName = "SceneCSkin"
    }

    public onCreated(): void {
        this.titlePos = this.title.y;
        this.title.y = 0;
    }

    public onEnable(): void {
        this.playStarAnim();
        this.playPhoneAnim();
        this.playTitleAnim();
        App.sndMgr.play(App.sndMgr.sceneC_bgm, Number.MAX_VALUE);
        this.phoneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public onRemove(): void {
        this.phoneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
    }
    
    private playStarAnim(){
        this.starGroup.alpha = 1;
        egret.Tween.get(this.starGroup,{loop:true}).to({alpha:0},500).to({alpha:1},500);
    }
    
    private playPhoneAnim(){
        this.phoneBtn.scaleX = 1;
        this.phoneBtn.scaleY = 1;
        egret.Tween.get(this.phoneBtn,{loop:true}).to({scaleX:1.1,scaleY:1.1},500).to({scaleX:1,scaleY:1},500);
    }
    
    private playTitleAnim(){
        this.title.y = 0;
        egret.Tween.get(this.title).to({y:this.titlePos},800);
    }
    
    private onTouch(){
        this.nextScene();
    }
    
    private nextScene(){
        egret.Tween.removeAllTweens();
        this.phoneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        App.layerMgr.runScene(App.sceneMgr.scrollScene);
    }


}
