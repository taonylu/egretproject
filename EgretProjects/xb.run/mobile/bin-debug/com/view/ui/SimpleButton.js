/**
 * 简单按钮
 * @author
 *
 */
var SimpleButton = (function (_super) {
    __extends(SimpleButton, _super);
    function SimpleButton() {
        _super.call(this, "SimpleButtonSkin");
    }
    var d = __define,c=SimpleButton,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.touchEnabled = true;
        this.up.visible = true;
        this.down.visible = false;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onTouchBegin = function () {
        this.down.visible = true;
        this.up.visible = false;
    };
    p.onTouchEnd = function () {
        this.down.visible = false;
        this.up.visible = true;
    };
    p.devieceDown = function () {
        var self = this;
        this.up.visible = false;
        this.down.visible = true;
        egret.Tween.get(this).wait(150).call(function () {
            self.up.visible = true;
            self.down.visible = false;
        }, this);
    };
    return SimpleButton;
}(BaseUI));
egret.registerClass(SimpleButton,'SimpleButton');
