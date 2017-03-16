var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 预加载界面
 * @author chenkai
 * @since 2016/12/27
 */
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "PreloadSceneSkin";
        return _this;
    }
    PreloadScene.prototype.childrenCreated = function () {
        this.setProgress(0);
    };
    /**
     * 设置进度
     * @progress 进度1-100
     */
    PreloadScene.prototype.setProgress = function (progress) {
        this.progressLabel.text = "加载中..." + progress + "%";
    };
    return PreloadScene;
}(BaseScene));
__reflect(PreloadScene.prototype, "PreloadScene");
//# sourceMappingURL=PreloadScene.js.map