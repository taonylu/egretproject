/**
 *
 * @author
 *
 */
var RuleUI = (function (_super) {
    __extends(RuleUI, _super);
    function RuleUI() {
        _super.call(this, "RuleUISkin");
    }
    var d = __define,c=RuleUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        //需要修改引擎源码，达到长久显示滑块目的
        this.scroller.scrollPolicyV = eui.ScrollPolicy.ON;
    };
    p.show = function () {
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkBtnTouch, this);
        LayerManager.getInstance().popLayer.addChild(this);
    };
    p.onOkBtnTouch = function () {
        this.parent && this.parent.removeChild(this);
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkBtnTouch, this);
        this.scroller.viewport.scrollV = 0;
    };
    return RuleUI;
})(BaseUI);
egret.registerClass(RuleUI,'RuleUI');
