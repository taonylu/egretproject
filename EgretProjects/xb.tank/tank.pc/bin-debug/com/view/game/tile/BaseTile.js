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
    p.reset = function () {
        this.canHit = false;
        this.canWalk = false;
    };
    //设置类型
    p.setType = function (type) {
        this.type = type;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    /**
     * 被攻击
     * @target 子弹
     * @return 返回地形是否被击毁
     */
    p.beAttacked = function (target) {
        return false;
    };
    //碰撞检测
    p.checkCollision = function (target) {
        //下一步坐标
        var nextX = target.x + target.speedX;
        var nextY = target.y + target.speedY;
        //目标和地形的半径碰撞
        if (Math.abs(nextX - this.x) < (32 + target.hitHalfWidth) && Math.abs(nextY - this.y) < (32 + target.hitHalfWidth)) {
            return true;
        }
        return false;
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(this.className).returnObject(this);
    };
    return BaseTile;
}(BaseUI));
egret.registerClass(BaseTile,'BaseTile');
