/**
 * 普通坦克
 * @author
 *
 */
var NormalTank = (function (_super) {
    __extends(NormalTank, _super);
    function NormalTank() {
        _super.call(this, "normalTank", 0, 1);
        this.reset();
    }
    var d = __define,c=NormalTank,p=c.prototype;
    p.reset = function () {
        this.speed = 4;
        this.power = 1;
        this.life = 1;
        this.shootTime = 0.5;
        this.type = TankEnum.normal;
    };
    return NormalTank;
}(BaseTank));
egret.registerClass(NormalTank,'NormalTank');
