/**
 * 矮木桩
 * @author
 *
 */
var LowWood = (function (_super) {
    __extends(LowWood, _super);
    function LowWood() {
        _super.call(this);
        this.bitmapData = RES.getRes("item_lowwood_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        this.type = 2;
    }
    var d = __define,c=LowWood,p=c.prototype;
    LowWood.NAME = "LowWood";
    return LowWood;
}(BaseItem));
egret.registerClass(LowWood,'LowWood');
