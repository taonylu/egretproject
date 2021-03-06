/**
 * 篮球
 * @author
 *
 */
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        _super.call(this, "ball_png", "ball_json", "ball");
        this.speedX = 0; //x，y，z速度
        this.speedY = 0;
        this.speedZ = 0;
        this.z = 0; //虚拟z轴
        this.realY = 0; //真实y值，不算z距离导致的视差
        this.bShoot = false; //是否进球，用于判断该球是否碰撞检测
        this.bTouchWall = false; //是否碰撞到墙，用于下落后迅速滚动回来
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.shadow = new egret.Bitmap(RES.getRes("shadow_png"));
        this.shadow.anchorOffsetX = this.shadow.width / 2;
    }
    var d = __define,c=Ball,p=c.prototype;
    p.recycle = function () {
        this.stop();
        this.realY = 0;
        this.bShoot = false;
        this.bTouchWall = false;
        this.shadow.parent && this.shadow.parent.removeChild(this.shadow);
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Ball.NAME).returnObject(this);
    };
    Ball.NAME = "Ball";
    return Ball;
})(SimpleMC);
egret.registerClass(Ball,'Ball');
