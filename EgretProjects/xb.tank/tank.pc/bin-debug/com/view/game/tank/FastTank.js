/**
 * 快速坦克
 * @author
 *
 */
var FastTank = (function (_super) {
    __extends(FastTank, _super);
    function FastTank() {
        _super.call(this);
        this.setMovieClip("fastTank_png", "fastTank_json", "fastTank");
        this.reset();
    }
    var d = __define,c=FastTank,p=c.prototype;
    //override  急速坦克动画normal haveItem
    p.playMoveAnim = function () {
        if (this.isHaveItem) {
            this.gotoAndPlay("haveItem", -1);
        }
        else {
            this.gotoAndPlay("normal", -1);
        }
    };
    //override
    p.reset = function () {
        _super.prototype.reset.call(this);
        var tankSet = MapManager.getInstance().tankSet.fastTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.fast;
        this.gotoAndStop("normal");
    };
    FastTank.NAME = "FastTank";
    return FastTank;
}(BaseTank));
egret.registerClass(FastTank,'FastTank');
