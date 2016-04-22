/**
 * 超级强化坦克
 * @author
 *
 */
var SuperTank = (function (_super) {
    __extends(SuperTank, _super);
    function SuperTank() {
        _super.call(this);
        this.setMovieClip("superTank_png", "superTank_json", "superTank");
        this.reset();
    }
    var d = __define,c=SuperTank,p=c.prototype;
    p.reset = function () {
        _super.prototype.reset.call(this);
        var tankSet = MapManager.getInstance().tankSet.superTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.super;
        this.gotoAndStop("lvl3");
    };
    SuperTank.NAME = "StrongTank";
    return SuperTank;
}(BaseTank));
egret.registerClass(SuperTank,'SuperTank');
