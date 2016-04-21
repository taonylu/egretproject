/**
 * 普通坦克
 * @author
 *
 */
var NormalTank = (function (_super) {
    __extends(NormalTank, _super);
    function NormalTank() {
        _super.call(this);
        this.reset();
    }
    var d = __define,c=NormalTank,p=c.prototype;
    p.reset = function () {
        var tankSet = MapManager.getInstance().tankSet.normalTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime;
        this.type = TankEnum.normal;
    };
    return NormalTank;
}(BaseTank));
egret.registerClass(NormalTank,'NormalTank');
