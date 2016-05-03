/**
 * 道具基类
 * @author
 *
 */
var BaseItem = (function (_super) {
    __extends(BaseItem, _super);
    function BaseItem() {
        _super.call(this);
    }
    var d = __define,c=BaseItem,p=c.prototype;
    //设置道具类型
    p.setType = function (_type) {
        this.type = _type;
        this.bitmapData = RES.getRes("item" + _type + "_png");
        this.anchorOffsetX = 32;
        this.anchorOffsetY = 32;
    };
    //闪烁效果
    p.startFlash = function () {
        egret.Tween.get(this, { loop: true }).wait(200).to({ alpha: 0 }).wait(200).to({ alpha: 1 });
    };
    //停止闪烁效果
    p.stopFlash = function () {
        this.alpha = 1;
        egret.Tween.removeTweens(this);
    };
    //碰撞检测
    p.checkCollision = function (target) {
        if (Math.abs(this.x - target.x) < 64 && Math.abs(this.y - target.y) < 64) {
            return true;
        }
        return false;
    };
    //回收
    p.recycle = function () {
        this.stopFlash();
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(BaseItem.NAME).returnObject(this);
    };
    BaseItem.NAME = "BaseItem";
    return BaseItem;
}(egret.Bitmap));
egret.registerClass(BaseItem,'BaseItem');
