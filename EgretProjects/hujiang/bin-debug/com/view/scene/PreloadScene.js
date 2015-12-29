/**
 *
 * @author
 * 预加载场景
 */
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        _super.call(this, "resource/myskin/scene/PreloadSkin.exml");
    }
    var d = __define,c=PreloadScene;p=c.prototype;
    //设置加载动画，progress = 1~10
    p.setAnimByProcess = function (progress) {
        this.loadingUI.setAnimByProcess(progress);
    };
    return PreloadScene;
})(BaseScene);
egret.registerClass(PreloadScene,"PreloadScene");
