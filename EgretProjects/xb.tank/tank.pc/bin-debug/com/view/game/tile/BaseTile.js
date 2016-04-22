/**
 * 地形基类
 * @author
 *
 */
var BaseTile = (function (_super) {
    __extends(BaseTile, _super);
    function BaseTile() {
        _super.call(this);
        this.className = ""; //类名
        this.life = 0; //生命值
        this.canHit = false; //可以被击中
        this.canWalk = false; //能够行走
        this.className = egret.getQualifiedClassName(this);
    }
    var d = __define,c=BaseTile,p=c.prototype;
    //设置类型
    p.setType = function (type) {
        this.type = type;
        this.bitmapData = RES.getRes("tile" + type + "_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    /**
     * 被攻击
     * @target 子弹
     * @return 返回击中是否有效
     */
    p.beAttacked = function (target) {
        return true;
    };
    p.reset = function () {
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(this.className).returnObject(this);
    };
    BaseTile.NAME = "BaseTile";
    return BaseTile;
}(egret.Bitmap));
egret.registerClass(BaseTile,'BaseTile');
