/**
 * 预加载场景
 * @author
 *
 */
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        _super.call(this, "PreloadSceneSkin");
    }
    var d = __define,c=PreloadScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.startFengAnim();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this);
    };
    p.setProgress = function (process) {
        if (this.inited) {
            this.progressLabel.text = process.toString() + "%";
        }
    };
    p.startFengAnim = function () {
        egret.Tween.get(this.fengChe, { loop: true }).to({ rotation: 1800 }, 10000).to({ rotation: 1800 }, 3000);
    };
    p.onRemoveStage = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this);
        egret.Tween.removeTweens(this.fengChe);
    };
    return PreloadScene;
}(BaseScene));
egret.registerClass(PreloadScene,'PreloadScene');
