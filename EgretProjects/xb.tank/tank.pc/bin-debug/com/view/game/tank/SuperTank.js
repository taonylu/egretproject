/**
 * 超级强化坦克
 * @author
 *
 */
var SuperTank = (function (_super) {
    __extends(SuperTank, _super);
    function SuperTank() {
        _super.call(this, "superTank_png", "superTank_json", "superTank");
        this.reset();
    }
    var d = __define,c=SuperTank,p=c.prototype;
    p.reset = function () {
        this.speed = 8;
        this.power = 1;
        this.life = 3;
        this.shootTime = 0.5;
        this.type = TankEnum.super;
    };
    return SuperTank;
}(BaseTank));
egret.registerClass(SuperTank,'SuperTank');
