/**
 * 玩家坦克
 * @author
 *
 */
var PlayerTank = (function (_super) {
    __extends(PlayerTank, _super);
    function PlayerTank() {
        _super.call(this);
        this.setMovieClip("playerYellowTank_png", "playerYellowTank_json", "playerYellowTank");
        this.reset();
    }
    var d = __define,c=PlayerTank,p=c.prototype;
    //设置玩家坦克，玩家1黄色坦克，玩家2绿色坦克
    p.setPlayerNo = function (no) {
        this.playerNo = no;
        if (this.playerNo == 1) {
            this.setMovieClip("playerYellowTank_png", "playerYellowTank_json", "playerYellowTank");
        }
        else {
            this.setMovieClip("playerGreenTank_png", "playerGreenTank_json", "playerGreenTank");
        }
    };
    //设置坦克威力，并且改变坦克外形
    p.setPower = function (power) {
        if (power >= 3) {
            power = 3;
        }
        if (this.power == power) {
            return;
        }
        this.power = power;
        this.gotoAndPlay("lvl" + this.power, -1);
    };
    //重置
    p.reset = function () {
        _super.prototype.reset.call(this);
        var tankSet = MapManager.getInstance().tankSet.playerTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.player;
        this.gotoAndStop("lvl1");
    };
    PlayerTank.NAME = "PlayerTank";
    return PlayerTank;
}(BaseTank));
egret.registerClass(PlayerTank,'PlayerTank');
