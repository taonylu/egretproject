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
    p.flyToHead = function (gameHead) {
        var self = this;
        egret.Tween.get(this).to({ y: this.y - 200 }, 200).to({ x: gameHead.x, y: gameHead.y, scaleX: 0.1, scaleY: 0.1 }, 1000, egret.Ease.circIn).call(function () {
            self.recycle();
        });
    };
    p.recycle = function () {
        this.scaleX = 1;
        this.scaleY = 1;
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(this.className).returnObject(this);
    };
    return BaseItem;
}(egret.Bitmap));
egret.registerClass(BaseItem,'BaseItem');
