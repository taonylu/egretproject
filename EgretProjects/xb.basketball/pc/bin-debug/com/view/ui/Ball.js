/**
 * 篮球
 * @author
 *
 */
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        _super.call(this, new egret.Bitmap(RES.getRes("ball_png")), 1, 50, 96, 96);
        this.speedX = 0; //x，y，z速度
        this.speedY = 0;
        this.speedZ = 0;
        this.z = 0; //虚拟z轴
        this.realY = 0; //真实y值，不算z距离导致的视差
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
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
