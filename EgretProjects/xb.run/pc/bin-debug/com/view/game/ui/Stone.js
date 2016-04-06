/**
 * 石头
 * @author
 *
 */
var Stone = (function (_super) {
    __extends(Stone, _super);
    function Stone() {
        _super.call(this);
        this.bitmapData = RES.getRes("stone_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    var d = __define,c=Stone,p=c.prototype;
    p.recycle = function () {
        _super.prototype.recycle.call(this);
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Stone.NAME).returnObject(this);
    };
    Stone.NAME = "Stone";
    return Stone;
}(BaseItem));
egret.registerClass(Stone,'Stone');
