/**
 * 预加载界面
 * @author chenkai
 * @date 2016/12/27
 */
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        _super.call(this);
        this.skinName = "PreloadSceneSkin";
    }
    var d = __define,c=PreloadScene,p=c.prototype;
    p.childrenCreated = function () {
        this.setProgress(0);
    };
    /**
     * 设置进度
     * @progress 进度1-100
     */
    p.setProgress = function (progress) {
        this.progressLabel.text = "加载中..." + progress + "%";
    };
    return PreloadScene;
}(BaseScene));
egret.registerClass(PreloadScene,'PreloadScene');
