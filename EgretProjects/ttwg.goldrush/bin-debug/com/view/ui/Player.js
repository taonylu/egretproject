/**
 *
 * @author
 *
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.bm0 = new egret.Bitmap(RES.getRes("player0_png"));
        this.bm1 = new egret.Bitmap(RES.getRes("player1_png"));
        this.addChild(this.bm0);
        this.addChild(this.bm1);
        this.bm1.visible = false;
    }
    var d = __define,c=Player;p=c.prototype;
    p.eat = function () {
        this.bm0.visible = false;
        this.bm1.visible = true;
        var self = this;
        egret.Tween.get(this).wait(100).call(function () {
            self.bm0.visible = true;
            self.bm1.visible = false;
        });
    };
    return Player;
})(egret.DisplayObjectContainer);
egret.registerClass(Player,"Player");
