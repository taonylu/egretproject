/**
 *
 * @author
 *
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.sleepTexture = RES.getRes("player0_png");
        this.eatTexture = RES.getRes("player1_png");
        this.texture = this.sleepTexture;
    }
    var d = __define,c=Player;p=c.prototype;
    //吃东西时显示
    p.eat = function () {
        var self = this;
        this.texture = this.eatTexture;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).wait(150).call(function () {
            self.texture = self.sleepTexture;
        });
    };
    return Player;
})(egret.Bitmap);
egret.registerClass(Player,"Player");
