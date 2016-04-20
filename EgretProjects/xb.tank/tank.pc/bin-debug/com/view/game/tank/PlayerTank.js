/**
 * 玩家坦克
 * @author
 *
 */
var PlayerTank = (function (_super) {
    __extends(PlayerTank, _super);
    function PlayerTank() {
        _super.call(this, "player", 0, 1);
        this.reset();
    }
    var d = __define,c=PlayerTank,p=c.prototype;
    p.reset = function () {
        this.speed = 4;
        this.power = 1;
        this.life = 1;
        this.shootTime = 0.5;
        this.type = TankEnum.player;
    };
    return PlayerTank;
}(BaseTank));
egret.registerClass(PlayerTank,'PlayerTank');
