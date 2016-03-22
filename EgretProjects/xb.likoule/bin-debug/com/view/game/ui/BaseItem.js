/**
 * 基础物品
 * @author
 *
 */
var BaseItem = (function (_super) {
    __extends(BaseItem, _super);
    function BaseItem(skinName) {
        _super.call(this);
        this.score = 0; //分值
        this.bitmapData = RES.getRes(skinName);
    }
    var d = __define,c=BaseItem,p=c.prototype;
    p.reset = function () {
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    p.recycle = function () {
    };
    return BaseItem;
}(egret.Bitmap));
egret.registerClass(BaseItem,'BaseItem');
