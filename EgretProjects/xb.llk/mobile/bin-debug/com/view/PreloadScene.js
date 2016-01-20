/**
 * 预加载界面
 * @author
 *
 */
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        _super.call(this, "PreloadSceneSkin");
        this.barStart = 0.15;
        this.barEnd = 1.45;
    }
    var d = __define,c=PreloadScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.setProgress = function (progress) {
        if (this.inited) {
            this.bar.scaleX = this.barStart + progress * (this.barEnd - this.barStart);
        }
    };
    return PreloadScene;
})(BaseScene);
egret.registerClass(PreloadScene,'PreloadScene');
