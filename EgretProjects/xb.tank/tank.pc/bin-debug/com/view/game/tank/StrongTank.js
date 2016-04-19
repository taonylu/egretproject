/**
 * 强化坦克
 * @author
 *
 */
var StrongTank = (function (_super) {
    __extends(StrongTank, _super);
    function StrongTank() {
        _super.call(this, "strongTank_png", "strongTank_json", "strongTank");
        this.reset();
    }
    var d = __define,c=StrongTank,p=c.prototype;
    p.reset = function () {
        this.speed = 8;
        this.power = 1;
        this.life = 2;
        this.shootTime = 0.5;
        this.type = TankEnum.strong;
    };
    return StrongTank;
}(BaseTank));
egret.registerClass(StrongTank,'StrongTank');
