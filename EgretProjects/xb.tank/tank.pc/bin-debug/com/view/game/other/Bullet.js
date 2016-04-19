/**
 * 子弹
 * @author
 *
 */
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        _super.call(this);
        this.speed = 0; //子弹速度
        this.speedX = 0; //移动速度
        this.speedY = 0;
        this.power = 0; //威力
        this.type = 0; //子弹发射方
        this.bitmapData = RES.getRes("");
    }
    var d = __define,c=Bullet,p=c.prototype;
    p.reset = function () {
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Bullet.NAME).returnObject(this);
    };
    Bullet.NAME = "Bullet";
    return Bullet;
}(egret.Bitmap));
egret.registerClass(Bullet,'Bullet');
