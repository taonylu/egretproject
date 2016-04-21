/**
 * 玩家坦克
 * @author
 *
 */
var PlayerTank = (function (_super) {
    __extends(PlayerTank, _super);
    function PlayerTank() {
        _super.call(this);
        this.reset();
    }
    var d = __define,c=PlayerTank,p=c.prototype;
    p.setPlayerNo = function (no) {
        this.playerNo = no;
        if (this.playerNo == 1) {
            this.addTexture("playerYellow_lvl" + this.power + "_", 0, 1);
        }
        else {
            this.addTexture("playerGreen_lvl" + this.power + "_", 0, 1);
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
        if (this.playerNo == 1) {
            this.addTexture("playerYellow_lvl" + this.power + "_", 0, 1);
        }
        else {
            this.addTexture("playerGreen_lvl" + this.power + "_", 0, 1);
        }
    };
    p.reset = function () {
        var tankSet = MapManager.getInstance().tankSet.playerTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime;
        this.type = TankEnum.player;
    };
    return PlayerTank;
}(BaseTank));
egret.registerClass(PlayerTank,'PlayerTank');
