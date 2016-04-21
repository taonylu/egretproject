/**
 * 超级强化坦克
 * @author
 *
 */
var SuperTank = (function (_super) {
    __extends(SuperTank, _super);
    function SuperTank() {
        _super.call(this);
        this.reset();
    }
    var d = __define,c=SuperTank,p=c.prototype;
    p.reset = function () {
        var tankSet = MapManager.getInstance().tankSet.superTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime;
        this.type = TankEnum.super;
    };
    return SuperTank;
}(BaseTank));
egret.registerClass(SuperTank,'SuperTank');
