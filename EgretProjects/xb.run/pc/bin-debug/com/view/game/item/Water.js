/**
 * 水池
 * @author
 *
 */
var Water = (function (_super) {
    __extends(Water, _super);
    function Water() {
        _super.call(this);
        this.bitmapData = RES.getRes("item_water_png");
        this.anchorOffsetX = this.width / 2 - 15;
        this.anchorOffsetY = this.height;
        this.type = 2;
    }
    var d = __define,c=Water,p=c.prototype;
    Water.NAME = "Water";
    return Water;
}(BaseItem));
egret.registerClass(Water,'Water');
