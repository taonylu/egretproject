/**
 * 2分数字
 * @author
 *
 */
var Score2 = (function (_super) {
    __extends(Score2, _super);
    function Score2() {
        _super.call(this, "num2");
    }
    var d = __define,c=Score2,p=c.prototype;
    p.recycle = function () {
        this.hide();
        ObjectPool.getPool(Score2.NAME).returnObject(this);
    };
    Score2.NAME = "Score2";
    return Score2;
}(BaseItem));
egret.registerClass(Score2,'Score2');
