/**
 * 玩家类
 * @author
 *
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this, "PlayerSkin");
    }
    var d = __define,c=Player,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    return Player;
}(BaseUI));
egret.registerClass(Player,'Player');
