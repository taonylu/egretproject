var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 图层管理类
 * @author chenkai
 * @date 2016/12/23
 */
var LayerManager = (function (_super) {
    __extends(LayerManager, _super);
    function LayerManager() {
        var _this = _super.call(this) || this;
        var stage = App.StageUtils.stage;
        _this.sceneLayer = new eui.UILayer();
        _this.sceneLayer.percentWidth = 100;
        _this.sceneLayer.percentHeight = 100;
        _this.sceneLayer.touchEnabled = false;
        stage.addChild(_this.sceneLayer);
        _this.panelLayer = new eui.UILayer();
        _this.panelLayer.percentWidth = 100;
        _this.panelLayer.percentHeight = 100;
        _this.panelLayer.touchEnabled = false;
        stage.addChild(_this.panelLayer);
        _this.tipLayer = new eui.UILayer();
        _this.tipLayer.percentWidth = 100;
        _this.tipLayer.percentHeight = 100;
        _this.tipLayer.touchEnabled = false;
        stage.addChild(_this.tipLayer);
        return _this;
    }
    return LayerManager;
}(SingleClass));
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map