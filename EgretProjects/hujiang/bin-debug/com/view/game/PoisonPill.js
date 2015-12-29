/**
 *
 * @author
 *
 */
var PoisonPill = (function (_super) {
    __extends(PoisonPill, _super);
    function PoisonPill() {
        _super.call(this);
        this.texture = RES.getRes("pill6_png");
    }
    var d = __define,c=PoisonPill;p=c.prototype;
    p.recycle = function () {
        ObjectPool.getPool(PoisonPill.NAME).returnObject(this);
    };
    PoisonPill.NAME = "PoisonPill";
    return PoisonPill;
})(BasePill);
egret.registerClass(PoisonPill,"PoisonPill");
