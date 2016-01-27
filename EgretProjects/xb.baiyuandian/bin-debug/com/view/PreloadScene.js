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
    };
    p.setProgress = function (process) {
        if (this.inited) {
            this.progressLabel.text = process.toString();
        }
    };
    return PreloadScene;
})(BaseScene);
egret.registerClass(PreloadScene,'PreloadScene');
