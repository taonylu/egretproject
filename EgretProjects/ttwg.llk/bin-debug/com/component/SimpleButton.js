/**
 * 简单按钮
 * 一张底图bitmap和一个文本textField
 * @author 羊力大仙
 */
var SimpleButton = (function (_super) {
    __extends(SimpleButton, _super);
    function SimpleButton(upUrl, downUrl) {
        if (downUrl === void 0) { downUrl = null; }
        _super.call(this);
        this.up = new egret.Bitmap(RES.getRes(upUrl));
        this.addChild(this.up);
        if (downUrl != null) {
            this.down = new egret.Bitmap(RES.getRes(downUrl));
            this.addChild(this.down);
            this.down.visible = false;
        }
        this.touchEnabled = true;
        this.touchChildren = false;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    }
    var d = __define,c=SimpleButton;p=c.prototype;
    p.touchBegin = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.onPress();
    };
    p.touchEnd = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.onRelease();
    };
    p.onPress = function () {
        if (this.down) {
            this.up.visible = false;
            this.down && (this.down.visible = true);
        }
    };
    p.onRelease = function () {
        if (this.down) {
            this.up.visible = true;
            this.down && (this.down.visible = false);
        }
    };
    p.setText = function (msg) {
        if (this.displayText == null && this.up != null) {
            this.displayText = new egret.TextField();
            this.displayText.width = this.up.width;
            this.displayText.height = this.up.height;
            this.displayText.textAlign = egret.HorizontalAlign.CENTER;
            this.displayText.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.displayText.textColor = 0x000000;
            this.addChild(this.displayText);
        }
        this.displayText.text = msg;
    };
    p.setTextColor = function (color) {
        if (this.displayText) {
            this.displayText.textColor = color;
        }
    };
    p.setTextSize = function (size) {
        if (this.displayText) {
            this.displayText.size = size;
        }
    };
    return SimpleButton;
})(egret.Sprite);
egret.registerClass(SimpleButton,"SimpleButton");
