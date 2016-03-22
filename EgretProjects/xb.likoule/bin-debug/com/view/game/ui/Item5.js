/**
 * 5分
 * @author
 *
 */
var Item5 = (function (_super) {
    __extends(Item5, _super);
    function Item5() {
        _super.call(this, "item01");
        this.score = 5;
    }
    var d = __define,c=Item5,p=c.prototype;
    p.recycle = function () {
        this.hide();
        ObjectPool.getPool(Item5.NAME).returnObject(this);
    };
    Item5.NAME = "Item5";
    return Item5;
}(BaseItem));
egret.registerClass(Item5,'Item5');
