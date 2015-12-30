/**
 *
 * @author
 *
 */
var SimpleButton = (function (_super) {
    __extends(SimpleButton, _super);
    function SimpleButton() {
        _super.call(this);
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(0, 0, 100, 50);
        this.graphics.endFill();
    }
    var d = __define,c=SimpleButton;p=c.prototype;
    return SimpleButton;
})(egret.Sprite);
egret.registerClass(SimpleButton,"SimpleButton");
