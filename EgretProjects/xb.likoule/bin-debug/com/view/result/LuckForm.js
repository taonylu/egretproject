/**
 * 中奖表格
 * @author
 *
 */
var LuckFormPanel = (function (_super) {
    __extends(LuckFormPanel, _super);
    function LuckFormPanel() {
        _super.call(this, "LuckFormSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=LuckFormPanel,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        this.reset();
        this.configListeners();
    };
    p.onRemove = function () {
        this.deConfigListeners();
    };
    p.reset = function () {
        this.nameLabel.text = "";
        this.telLabel.text = "";
        this.addressLabel.text = "";
    };
    p.configListeners = function () {
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitTouch, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
    };
    p.deConfigListeners = function () {
        this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitTouch, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
    };
    p.onSubmitTouch = function () {
        //TODO 提交表格
    };
    p.onCloseTouch = function () {
        this.hide();
    };
    return LuckFormPanel;
}(BaseUI));
egret.registerClass(LuckFormPanel,'LuckFormPanel');
