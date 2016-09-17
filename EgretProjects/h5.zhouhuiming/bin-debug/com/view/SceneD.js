/**
 * 场景D
 * @author
 *
 */
var SceneD = (function (_super) {
    __extends(SceneD, _super);
    function SceneD() {
        _super.call(this);
        this.imgList = [];
        this.skinName = "SceneDSkin";
    }
    var d = __define,c=SceneD,p=c.prototype;
    p.onCreated = function () {
        for (var i = 0; i < 6; i++) {
            this.imgList.push(this.imgGroup.getChildAt(i));
        }
        this.arrowPos = this.arrow.y;
        this.titlePos = this.title.y;
        this.title.y = 0;
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    p.startAnim = function () {
        this.validateNow();
        this.playTitleAnim();
        this.playStarAnim();
        this.playFireWork();
        this.playImgAnim();
        this.playArrow();
        this.isAnimDone = true;
    };
    p.stopAnim = function () {
        egret.Tween.removeAllTweens();
    };
    p.playTitleAnim = function () {
        this.title.y = 0;
        egret.Tween.get(this.title).to({ y: this.titlePos }, 500);
    };
    p.playStarAnim = function () {
        this.starGroup.alpha = 1;
        egret.Tween.get(this.starGroup, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
    };
    p.playFireWork = function () {
        egret.Tween.get(this.star0).wait(500).to({ alpha: 0., scaleX: 5, scaleY: 5, x: (this.star0.x - 100) }, 2000);
        egret.Tween.get(this.star1).wait(500).to({ alpha: 0, scaleX: 5, scaleY: 5, x: (this.star1.x + 100) }, 2000);
    };
    p.playImgAnim = function () {
        var len = this.imgList.length;
        for (var i = 0; i < len; i++) {
            this.imgList[i].scaleX = 0;
            this.imgList[i].scaleY = 0;
        }
        var time = 500;
        egret.Tween.get(this.imgList[0]).wait(time).to({ scaleX: 1, scaleY: 1 }, time, egret.Ease.bounceOut);
        egret.Tween.get(this.imgList[1]).wait(time * 2).to({ scaleX: 1, scaleY: 1 }, time, egret.Ease.bounceOut);
        egret.Tween.get(this.imgList[2]).wait(time * 3).to({ scaleX: 1, scaleY: 1 }, time, egret.Ease.bounceOut);
        egret.Tween.get(this.imgList[3]).wait(time * 4).to({ scaleX: 1, scaleY: 1 }, time, egret.Ease.bounceOut);
        egret.Tween.get(this.imgList[4]).wait(time * 5).to({ scaleX: 1, scaleY: 1 }, time, egret.Ease.bounceOut);
        egret.Tween.get(this.imgList[5]).wait(time * 6).to({ scaleX: 1, scaleY: 1 }, time, egret.Ease.bounceOut);
    };
    p.playArrow = function () {
        this.arrow.y = this.arrowPos;
        egret.Tween.get(this.arrow, { loop: true }).to({ y: this.arrowPos - 10 }, 300).to({ y: this.arrowPos }, 300);
    };
    return SceneD;
}(BaseScene));
egret.registerClass(SceneD,'SceneD');
