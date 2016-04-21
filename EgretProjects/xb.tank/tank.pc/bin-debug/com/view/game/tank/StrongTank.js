/**
 * 强化坦克
 * @author
 *
 */
var StrongTank = (function (_super) {
    __extends(StrongTank, _super);
    function StrongTank() {
        _super.call(this);
        this.reset();
    }
    var d = __define,c=StrongTank,p=c.prototype;
    p.reset = function () {
        var tankSet = MapManager.getInstance().tankSet.strongTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime;
        this.type = TankEnum.strong;
    };
    return StrongTank;
}(BaseTank));
egret.registerClass(StrongTank,'StrongTank');
