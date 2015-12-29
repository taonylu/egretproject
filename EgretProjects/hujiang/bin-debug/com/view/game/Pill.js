/**
 *
 * @author
 *  下落的药丸
 */
var Pill = (function (_super) {
    __extends(Pill, _super);
    function Pill() {
        _super.call(this);
        var rand = Math.floor(Math.random() * 4); //随机0-3
        this.texture = RES.getRes("pill" + rand + "_png");
        this.score = 1;
    }
    var d = __define,c=Pill;p=c.prototype;
    p.recycle = function () {
        ObjectPool.getPool(Pill.NAME).returnObject(this);
    };
    Pill.NAME = "Pill";
    return Pill;
})(BasePill);
egret.registerClass(Pill,"Pill");
