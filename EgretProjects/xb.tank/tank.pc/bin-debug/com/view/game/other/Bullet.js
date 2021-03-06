/**
 * 子弹
 * @author
 *
 */
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        _super.call(this);
        this.speed = 8; //子弹速度
        this.speedX = 0; //移动速度
        this.speedY = 0;
        this.power = 0; //威力
        this.type = 0; //子弹发射方
        this.hitWidth = 16; //碰撞检测范围，因为切图大小并不是64x64，所以不能取width判断碰撞范围，这里自定义一个变量
        this.hitHalfWidth = 8;
        this.bitmapData = RES.getRes("bullet_png");
        this.anchorOffsetX = 16;
        this.anchorOffsetY = 16;
        this.bulletSpeed = MapManager.getInstance().itemSet.bulletSpeed;
    }
    var d = __define,c=Bullet,p=c.prototype;
    //子弹威力
    p.setPower = function (power) {
        this.power = power;
        this.speed = this.bulletSpeed[this.power - 1];
    };
    p.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    //返回是否碰撞
    p.checkCollision = function (target) {
        if (Math.abs(this.x - target.x) < (target.hitHalfWidth + this.hitHalfWidth) &&
            Math.abs(this.y - target.y) < (target.hitHalfWidth + this.hitHalfWidth)) {
            return true;
        }
        return false;
    };
    p.reset = function () {
        this.speedX = 0;
        this.speedY = 0;
        this.power = 1;
        this.rotation = 0;
        this.owner = null;
    };
    p.recycle = function () {
        this.reset();
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Bullet.NAME).returnObject(this);
    };
    Bullet.NAME = "Bullet";
    return Bullet;
}(egret.Bitmap));
egret.registerClass(Bullet,'Bullet');
