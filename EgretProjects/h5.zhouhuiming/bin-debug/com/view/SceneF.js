/**
 * 场景E
 * @author
 *
 */
var SceneF = (function (_super) {
    __extends(SceneF, _super);
    function SceneF() {
        _super.call(this);
        this.skinName = "SceneFSkin";
    }
    var d = __define,c=SceneF,p=c.prototype;
    p.onCreated = function () {
        this.titlePos = this.title.y;
        this.arrowPos = this.arrow.y;
        this.title.y = 0;
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    p.startAnim = function () {
        this.playTitleAnim();
        this.playStarAnim();
        this.playArrow();
        this.isAnimDone = true;
    };
    p.stopAnim = function () {
        egret.Tween.removeAllTweens();
    };
    p.playStarAnim = function () {
        this.starGroup.alpha = 1;
        egret.Tween.get(this.starGroup, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
    };
    p.playTitleAnim = function () {
        this.title.y = 0;
        egret.Tween.get(this.title).to({ y: this.titlePos }, 1000);
    };
    p.playArrow = function () {
        this.arrow.y = this.arrowPos;
        egret.Tween.get(this.arrow, { loop: true }).to({ y: this.arrowPos - 10 }, 300).to({ y: this.arrowPos }, 300);
    };
    return SceneF;
}(BaseScene));
egret.registerClass(SceneF,'SceneF');
