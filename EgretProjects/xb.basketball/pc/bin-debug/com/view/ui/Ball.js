/**
 * 篮球
 * @author
 *
 */
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        _super.call(this, new egret.Bitmap(RES.getRes("ball_png")), 1, 50, 96, 96);
    }
    var d = __define,c=Ball,p=c.prototype;
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Ball.NAME).returnObject(this);
    };
    Ball.NAME = "Ball";
    return Ball;
})(FrameMovie);
egret.registerClass(Ball,'Ball');