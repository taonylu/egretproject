/**
 * 快速坦克
 * @author
 *
 */
var FastTank = (function (_super) {
    __extends(FastTank, _super);
    function FastTank() {
        _super.call(this);
        this.reset();
    }
    var d = __define,c=FastTank,p=c.prototype;
    p.reset = function () {
        var tankSet = MapManager.getInstance().tankSet.fastTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime;
        this.type = TankEnum.fast;
    };
    return FastTank;
}(BaseTank));
egret.registerClass(FastTank,'FastTank');
