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
    }
    var d = __define,c=BaseItem,p=c.prototype;
    p.changeAlpha = function () {
        var self = this;
        egret.Tween.get(this).to({ y: (this.y - 300), alpha: 0 }, 200).call(function () {
            self.recycle();
        });
    };
    p.recycle = function () {
    };
    return BaseItem;
}(egret.Bitmap));
egret.registerClass(BaseItem,'BaseItem');
