var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 弹框基类
 * @author chenkai
 * @date 2016/12/18
 */
var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    function BasePanel() {
        var _this = _super.call(this) || this;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    /**显示到舞台*/
    BasePanel.prototype.onEnable = function () {
    };
    /**从舞台移除*/
    BasePanel.prototype.onRemove = function () {
    };
    return BasePanel;
}(eui.Component));
__reflect(BasePanel.prototype, "BasePanel");
