/**
 * 弹框基类
 * @author chenkai
 * @date 2016/12/18
 */
var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    function BasePanel() {
        _super.call(this);
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=BasePanel,p=c.prototype;
    /**显示到舞台*/
    p.onEnable = function () {
    };
    /**从舞台移除*/
    p.onRemove = function () {
    };
    return BasePanel;
}(eui.Component));
egret.registerClass(BasePanel,'BasePanel');
