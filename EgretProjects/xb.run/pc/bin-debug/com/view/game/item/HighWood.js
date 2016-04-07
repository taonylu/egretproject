/**
 * 高木桩
 * @author
 *
 */
var HighWood = (function (_super) {
    __extends(HighWood, _super);
    function HighWood() {
        _super.call(this);
        this.bitmapData = RES.getRes("item_highwood_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        this.type = 1;
    }
    var d = __define,c=HighWood,p=c.prototype;
    HighWood.NAME = "HighWood";
    return HighWood;
}(BaseItem));
egret.registerClass(HighWood,'HighWood');
