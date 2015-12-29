/**
 *
 * @author
 *
 */
var BasePill = (function (_super) {
    __extends(BasePill, _super);
    function BasePill() {
        _super.call(this);
        this.score = 0;
    }
    var d = __define,c=BasePill;p=c.prototype;
    //回收
    p.recycle = function () {
    };
    return BasePill;
})(egret.Bitmap);
egret.registerClass(BasePill,"BasePill");
