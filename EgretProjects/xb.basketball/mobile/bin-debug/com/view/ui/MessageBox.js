/**
 * 提示框
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
    };
    p.showMessage = function (msg, size) {
        if (size === void 0) { size = 25; }
        this.msgLabel.size = size;
        this.x = (GameConst.stage.stageWidth - this.width) / 2;
        this.y = (GameConst.stage.stageHeight - this.height) / 2;
        LayerManager.getInstance().popLayer.addChild(this);
        this.msgLabel.text = msg;
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return MessageBox;
}(BaseUI));
egret.registerClass(MessageBox,'MessageBox');
