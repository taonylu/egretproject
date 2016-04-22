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
        this.bitmapData = RES.getRes("bullet_png");
        this.anchorOffsetX = 16;
        this.anchorOffsetY = 16;
    }
    var d = __define,c=Bullet,p=c.prototype;
    p.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    p.reset = function () {
        this.speedX = 0;
        this.speedY = 0;
        this.power = 1;
        this.rotation = 0;
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
