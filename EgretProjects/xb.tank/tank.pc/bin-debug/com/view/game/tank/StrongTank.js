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
    //override  强化坦克动画lvl1 lvl2 haveItem
    p.playMoveAnim = function () {
        if (this.isHaveItem) {
            this.gotoAndPlay("haveItem", -1);
        }
        else if (this.life == 2) {
            this.gotoAndPlay("lvl2", -1);
        }
        else {
            this.gotoAndPlay("lvl1", -1);
        }
    };
    //override
    p.setPower = function (power) {
        _super.prototype.setPower.call(this, power);
        this.shootTime = MapManager.getInstance().tankSet.strongTank.shootTime[this.power - 1];
    };
    //override
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
