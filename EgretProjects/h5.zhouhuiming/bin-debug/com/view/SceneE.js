/**
 * 场景E
 * @author
 *
 */
var SceneE = (function (_super) {
    __extends(SceneE, _super);
    function SceneE() {
        _super.call(this);
        this.skinName = "SceneESkin";
    }
    var d = __define,c=SceneE,p=c.prototype;
    p.onCreated = function () {
        this.titlePos = this.title.y;
        this.title.y = 0;
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    p.startAnim = function () {
        this.playPhoneAnim();
        this.playTitleAnim();
        this.playStarAnim();
        this.isAnimDone = true;
    };
    p.stopAnim = function () {
        egret.Tween.removeAllTweens();
    };
    p.playStarAnim = function () {
        this.starGroup.alpha = 1;
        egret.Tween.get(this.starGroup, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
    };
    p.onTouch = function () {
    };
    p.playTitleAnim = function () {
        this.title.y = 0;
        egret.Tween.get(this.title).to({ y: this.titlePos }, 500);
    };
    p.playPhoneAnim = function () {
        this.phoneBtn.scaleX = 1;
        this.phoneBtn.scaleY = 1;
        egret.Tween.get(this.phoneBtn, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
    };
    return SceneE;
}(BaseScene));
egret.registerClass(SceneE,'SceneE');
