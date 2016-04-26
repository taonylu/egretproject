/**
 * 强化坦克
 * @author
 *
 */
var StrongTank = (function (_super) {
    __extends(StrongTank, _super);
    function StrongTank() {
        _super.call(this);
        this.setMovieClip("strongTank_png", "strongTank_json", "strongTank");
        this.reset();
    }
    var d = __define,c=StrongTank,p=c.prototype;
    p.reset = function () {
        _super.prototype.reset.call(this);
        var tankSet = MapManager.getInstance().tankSet.strongTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.strong;
        this.gotoAndStop("lvl2");
    };
    StrongTank.NAME = "StrongTank";
    return StrongTank;
}(BaseTank));
egret.registerClass(StrongTank,'StrongTank');
//# sourceMappingURL=StrongTank.js.map