/**
 * 场景C
 * @author
 *
 */
var SceneC = (function (_super) {
    __extends(SceneC, _super);
    function SceneC() {
        _super.call(this);
        this.skinName = "SceneCSkin";
    }
    var d = __define,c=SceneC,p=c.prototype;
    p.onCreated = function () {
        this.titlePos = this.title.y;
        this.title.y = 0;
    };
    p.onEnable = function () {
        this.playStarAnim();
        this.playPhoneAnim();
        this.playTitleAnim();
        App.sndMgr.play(App.sndMgr.sceneC_bgm, Number.MAX_VALUE);
        this.phoneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    p.onRemove = function () {
        this.phoneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    p.playStarAnim = function () {
        this.starGroup.alpha = 1;
        egret.Tween.get(this.starGroup, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
    };
    p.playPhoneAnim = function () {
        this.phoneBtn.scaleX = 1;
        this.phoneBtn.scaleY = 1;
        egret.Tween.get(this.phoneBtn, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
    };
    p.playTitleAnim = function () {
        this.title.y = 0;
        egret.Tween.get(this.title).to({ y: this.titlePos }, 800);
    };
    p.onTouch = function () {
        this.nextScene();
    };
    p.nextScene = function () {
        egret.Tween.removeAllTweens();
        this.phoneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        App.layerMgr.runScene(App.sceneMgr.scrollScene);
    };
    return SceneC;
}(BaseScene));
egret.registerClass(SceneC,'SceneC');
