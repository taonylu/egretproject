/**
 * 快速坦克
 * @author
 *
 */
var FastTank = (function (_super) {
    __extends(FastTank, _super);
    function FastTank() {
        _super.call(this, "fastTank", 0, 1);
        this.reset();
    }
    var d = __define,c=FastTank,p=c.prototype;
    p.reset = function () {
        this.speed = 8;
        this.power = 1;
        this.life = 1;
        this.shootTime = 0.5;
        this.type = TankEnum.fast;
    };
    return FastTank;
}(BaseTank));
egret.registerClass(FastTank,'FastTank');
