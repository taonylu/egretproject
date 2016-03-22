/**
 *
 * @author
 *
 */
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        _super.call(this, "ball_png", "ball_json", "ball");
        this.score = 20;
    }
    var d = __define,c=Ball,p=c.prototype;
    p.recycle = function () {
        this.stop();
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Ball.NAME).returnObject(this);
    };
    Ball.NAME = "Ball";
    return Ball;
}(SimpleMC));
egret.registerClass(Ball,'Ball');
