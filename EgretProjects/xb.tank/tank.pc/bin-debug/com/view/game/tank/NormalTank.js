/**
 * 普通坦克
 * @author
 *
 */
var NormalTank = (function (_super) {
    __extends(NormalTank, _super);
    function NormalTank() {
        _super.call(this);
        this.setMovieClip("normalTank_png", "normalTank_json", "normalTank");
        this.reset();
    }
    var d = __define,c=NormalTank,p=c.prototype;
    //override  普通坦克动画normal haveItem
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
        var tankSet = MapManager.getInstance().tankSet.normalTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.normal;
        this.gotoAndStop("normal");
    };
    NormalTank.NAME = "NormalTank";
    return NormalTank;
}(BaseTank));
egret.registerClass(NormalTank,'NormalTank');
