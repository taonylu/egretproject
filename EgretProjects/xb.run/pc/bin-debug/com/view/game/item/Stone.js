/**
 * 石头
 * @author
 *
 */
var Stone = (function (_super) {
    __extends(Stone, _super);
    function Stone() {
        _super.call(this);
        this.bitmapData = RES.getRes("item_stone_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        this.type = 1;
    }
    var d = __define,c=Stone,p=c.prototype;
    Stone.NAME = "Stone";
    return Stone;
}(BaseItem));
egret.registerClass(Stone,'Stone');
