/**
 * 玩家类
 * @author
 *
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this, "player_png", "player_json", "player");
        this.isJumping = false; //是否跳跃
        this.scaleX = this.scaleY = 3;
    }
    var d = __define,c=Player,p=c.prototype;
    return Player;
}(SimpleMC));
egret.registerClass(Player,'Player');
