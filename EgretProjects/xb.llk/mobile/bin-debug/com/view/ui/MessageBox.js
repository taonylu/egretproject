/**
 * 消息框
 * @author
 *
 */
var MessageBox = (function (_super) {
    __extends(MessageBox, _super);
    function MessageBox() {
        _super.call(this, "MessageBoxSkin");
        this._msg = "";
    }
    var d = __define,c=MessageBox,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.msgLabel.text = this._msg;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
    };
    p.showMessage = function (msg) {
        this._msg = msg;
        if (this.inited) {
            this.msgLabel.text = msg;
        }
        LayerManager.getInstance().popLayer.addChild(this);
    };
    p.onCloseTouch = function () {
        this.parent && this.parent.removeChild(this);
    };
    return MessageBox;
})(BaseUI);
egret.registerClass(MessageBox,'MessageBox');
