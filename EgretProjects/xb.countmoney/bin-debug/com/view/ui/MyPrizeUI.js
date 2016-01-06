/**
 *
 * @author
 *
 */
var MyPrizeUI = (function (_super) {
    __extends(MyPrizeUI, _super);
    function MyPrizeUI() {
        _super.call(this, "MyPrizeUISkin");
    }
    var d = __define,c=MyPrizeUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.show = function (msg) {
        this.contentLabel.text = msg;
        LayerManager.getInstance().popLayer.addChild(this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
    };
    p.onOKBtnTouch = function () {
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
        this.parent && this.parent.removeChild(this);
    };
    return MyPrizeUI;
})(BaseUI);
egret.registerClass(MyPrizeUI,'MyPrizeUI');
