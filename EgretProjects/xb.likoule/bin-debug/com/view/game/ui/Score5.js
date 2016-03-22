/**
 * 5分数字
 * @author
 *
 */
var Score5 = (function (_super) {
    __extends(Score5, _super);
    function Score5() {
        _super.call(this, "num5");
    }
    var d = __define,c=Score5,p=c.prototype;
    p.recycle = function () {
        this.hide();
        ObjectPool.getPool(Score5.NAME).returnObject(this);
    };
    Score5.NAME = "Score5";
    return Score5;
}(BaseItem));
egret.registerClass(Score5,'Score5');
