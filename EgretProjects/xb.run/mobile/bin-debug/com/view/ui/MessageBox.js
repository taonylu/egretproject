/**
 * 消息弹框
 * @author
 *
 */
var MessageBox = (function (_super) {
    __extends(MessageBox, _super);
    function MessageBox() {
        _super.call(this, "MessageBoxSkin");
    }
    var d = __define,c=MessageBox,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.onTouchTap = function () {
        this.hide();
        this.dispatchEvent(new egret.Event("close"));
    };
    p.showMsg = function (msg) {
        this.msgLabel.text = msg;
        LayerManager.getInstance().popLayer.addChild(this);
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return MessageBox;
}(BaseUI));
egret.registerClass(MessageBox,'MessageBox');
