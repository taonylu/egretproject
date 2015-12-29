/**
 * 预加载界面
 * @author
 *
 */
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        _super.call(this, "PreloadSceneSkin");
    }
    var d = __define,c=PreloadScene,p=c.prototype;
    p.onEnable = function () {
        this.setProcessLabel(0);
    };
    p.setProcessLabel = function (process) {
        if (this.inited) {
            this.processLabel.text = process + "%";
        }
    };
    return PreloadScene;
})(BaseScene);
egret.registerClass(PreloadScene,'PreloadScene');
