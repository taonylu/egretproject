/**
 * 玩家
 * @author
 *
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.textureList = [];
        this.bShake = false;
        this.textureList[0] = RES.getRes("game_girl0_png");
        this.textureList[1] = RES.getRes("game_girl1_png");
        this.textureList[2] = RES.getRes("game_girl2_png");
        this.texture = this.textureList[0];
        this.anchorOffsetX = this.width / 2; //调整player的大小和中心点
        this.anchorOffsetY = this.height - 15;
    }
    var d = __define,c=Player,p=c.prototype;
    p.shakeHead = function () {
        if (this.bShake) {
            return;
        }
        this.bShake = true;
        var self = this;
        egret.Tween.get(this, { loop: true }).call(function () {
            self.texture = self.textureList[1];
        }).wait(300).
            call(function () {
            self.texture = self.textureList[2];
        }).wait(300);
    };
    p.stopShake = function () {
        this.bShake = false;
        egret.Tween.removeTweens(this);
        this.texture = this.textureList[0];
    };
    return Player;
})(egret.Bitmap);
egret.registerClass(Player,'Player');
