/**
 * 2分
 * @author
 *
 */
var Item2 = (function (_super) {
    __extends(Item2, _super);
    function Item2() {
        _super.call(this, "item00");
        this.score = 2;
    }
    var d = __define,c=Item2,p=c.prototype;
    p.recycle = function () {
        this.hide();
        ObjectPool.getPool(Item2.NAME).returnObject(this);
    };
    Item2.NAME = "Item2";
    return Item2;
}(BaseItem));
egret.registerClass(Item2,'Item2');
