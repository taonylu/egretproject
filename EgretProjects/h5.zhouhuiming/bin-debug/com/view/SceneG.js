/**
 * 场景E
 * @author
 *
 */
var SceneG = (function (_super) {
    __extends(SceneG, _super);
    function SceneG() {
        _super.call(this);
        this.skinName = "SceneGSkin";
    }
    var d = __define,c=SceneG,p=c.prototype;
    p.onCreated = function () {
        this.titlePos = this.title.y;
        this.title.y = 0;
        this.tree.alpha = 0;
        this.submitBg.alpha = 0;
        this.submitBtn.alpha = 0;
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    p.startAnim = function () {
        this.playTitleAnim();
        this.playStarAnim();
        this.isAnimDone = true;
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmit, this);
    };
    p.onSubmit = function () {
        alert("本作品是测试demo，提交无效");
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
        egret.Tween.get(this.title).to({ y: this.titlePos }, 500);
        this.submitBg.alpha = 0;
        egret.Tween.get(this.submitBg).wait(500).to({ alpha: 1 }, 500);
        this.tree.alpha = 0;
        egret.Tween.get(this.tree).wait(1000).to({ alpha: 1 }, 500);
        this.submitBtn.alpha = 0;
        egret.Tween.get(this.submitBtn).wait(1500).to({ alpha: 1 }, 500);
        this.submitBtn.scaleX = 1;
        this.submitBtn.scaleY = 1;
        egret.Tween.get(this.submitBtn, { loop: true }).wait(2000).to({ scaleX: 1.1, scaleY: 1.1 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
    };
    return SceneG;
}(BaseScene));
egret.registerClass(SceneG,'SceneG');
