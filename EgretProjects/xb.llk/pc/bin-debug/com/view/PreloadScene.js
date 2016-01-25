/**
 *
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
    };
    p.setProgress = function (progress) {
        if (this.inited) {
            this.bar.scaleX = 0.15 + progress / 100 * 1.5;
            this.progressLabel.text = progress + "%";
        }
    };
    return PreloadScene;
})(BaseScene);
egret.registerClass(PreloadScene,'PreloadScene');
