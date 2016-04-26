/**
 * 道具基类
 * @author
 *
 */
var BaseItem = (function (_super) {
    __extends(BaseItem, _super);
    function BaseItem() {
        _super.call(this);
    }
    var d = __define,c=BaseItem,p=c.prototype;
    //设置道具类型
    p.setType = function (_type) {
        this.type = _type;
        this.bitmapData = RES.getRes("item" + _type + "_png");
    };
    //回收
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(BaseItem.NAME).returnObject(this);
    };
    BaseItem.NAME = "BaseItem";
    return BaseItem;
}(egret.Bitmap));
egret.registerClass(BaseItem,'BaseItem');
//# sourceMappingURL=BaseItem.js.map