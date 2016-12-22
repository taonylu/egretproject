/**
 * UI基类
 * @author chenkai
 * @date 2016/12/18
 */
var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    function BasePanel() {
        _super.apply(this, arguments);
    }
    var d = __define,c=BasePanel,p=c.prototype;
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    p.onReset = function () {
    };
    p.onDestory = function () {
    };
    return BasePanel;
}(eui.Component));
egret.registerClass(BasePanel,'BasePanel',["IBasePanel"]);
//# sourceMappingURL=BasePanel.js.map