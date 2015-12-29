/**
 *
 * @author
 *
 */
var Pill10 = (function (_super) {
    __extends(Pill10, _super);
    function Pill10() {
        _super.call(this);
        this.texture = RES.getRes("pill5_png");
        this.score = 10;
    }
    var d = __define,c=Pill10;p=c.prototype;
    p.recycle = function () {
        ObjectPool.getPool(Pill10.NAME).returnObject(this);
    };
    Pill10.NAME = "Pill10";
    return Pill10;
})(BasePill);
egret.registerClass(Pill10,"Pill10");
