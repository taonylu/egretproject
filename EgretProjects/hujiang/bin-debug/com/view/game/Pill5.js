/**
 *
 * @author
 *
 */
var Pill5 = (function (_super) {
    __extends(Pill5, _super);
    function Pill5() {
        _super.call(this);
        this.texture = RES.getRes("pill4_png");
        this.score = 5;
    }
    var d = __define,c=Pill5;p=c.prototype;
    p.recycle = function () {
        ObjectPool.getPool(Pill5.NAME).returnObject(this);
    };
    Pill5.NAME = "Pill5";
    return Pill5;
})(BasePill);
egret.registerClass(Pill5,"Pill5");
