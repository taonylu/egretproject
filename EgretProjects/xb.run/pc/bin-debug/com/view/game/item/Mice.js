/**
 * 地鼠
 * @author
 *
 */
var Mice = (function (_super) {
    __extends(Mice, _super);
    function Mice() {
        _super.call(this);
        this.bitmapData = RES.getRes("item_mice_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        this.type = 1;
    }
    var d = __define,c=Mice,p=c.prototype;
    Mice.NAME = "Mice";
    return Mice;
}(BaseItem));
egret.registerClass(Mice,'Mice');
