/**
 * 20分数字
 * @author
 *
 */
var Score20 = (function (_super) {
    __extends(Score20, _super);
    function Score20() {
        _super.call(this, "num20");
    }
    var d = __define,c=Score20,p=c.prototype;
    p.recycle = function () {
        this.hide();
        ObjectPool.getPool(Score20.NAME).returnObject(this);
    };
    Score20.NAME = "Score20";
    return Score20;
}(BaseItem));
egret.registerClass(Score20,'Score20');
