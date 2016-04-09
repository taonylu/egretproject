/**
 * 水果基类
 * @author
 *
 */
var BaseItem = (function (_super) {
    __extends(BaseItem, _super);
    function BaseItem() {
        _super.call(this);
        this.score = 0; //分值
        this.track = 0; //赛道
        this.className = egret.getQualifiedClassName(this);
    }
    var d = __define,c=BaseItem,p=c.prototype;
    p.changeAlpha = function () {
        var self = this;
        egret.Tween.get(this).to({ y: (this.y - 300), alpha: 0 }, 200).call(function () {
            self.recycle();
        });
    };
    p.recycle = function () {
        this.alpha = 1;
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(this.className).returnObject(this);
    };
    return BaseItem;
}(egret.Bitmap));
egret.registerClass(BaseItem,'BaseItem');
