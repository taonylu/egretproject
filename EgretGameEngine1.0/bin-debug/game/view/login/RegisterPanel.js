/**
 *
 * @author
 *
 */
var RegisterPanel = (function (_super) {
    __extends(RegisterPanel, _super);
    function RegisterPanel() {
        _super.call(this);
        this.skinName = "RegisterPanelSkin";
    }
    var d = __define,c=RegisterPanel,p=c.prototype;
    p.childrenCreated = function () {
        console.log("registerPanel created");
    };
    p.onEnable = function () {
        console.log("registerPanel onEnable");
    };
    p.onRemove = function () {
        console.log("registerPanel onRemove");
    };
    return RegisterPanel;
}(BasePanel));
egret.registerClass(RegisterPanel,'RegisterPanel');
