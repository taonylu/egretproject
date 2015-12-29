/**
 * 折扣UI
 * @author
 *
 */
var DiscountUI = (function (_super) {
    __extends(DiscountUI, _super);
    function DiscountUI() {
        _super.call(this);
        this.zhe0 = new egret.Bitmap(RES.getRes("zhe0_png"));
        this.addChild(this.zhe0);
        this.zhe1 = new egret.Bitmap(RES.getRes("zhe1_png"));
        this.addChild(this.zhe1);
        this.displayText = new egret.TextField();
        this.displayText.width = this.zhe0.width;
        this.displayText.height = this.zhe0.height;
        this.displayText.size = 18;
        this.displayText.textColor = 0x000000;
        this.displayText.textAlign = egret.HorizontalAlign.CENTER;
        this.displayText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.displayText);
    }
    var d = __define,c=DiscountUI;p=c.prototype;
    p.setZhe = function (isVisable) {
        this.zhe0.visible = !isVisable;
        this.zhe1.visible = isVisable;
    };
    p.setText = function (msg) {
        this.displayText.text = msg;
    };
    return DiscountUI;
})(egret.Sprite);
egret.registerClass(DiscountUI,"DiscountUI");
