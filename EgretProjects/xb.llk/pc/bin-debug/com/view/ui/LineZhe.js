/**
 * 连线竖
 * @author
 *
 */
var LineZhe = (function (_super) {
    __extends(LineZhe, _super);
    function LineZhe() {
        _super.call(this);
        this.bitmapData = RES.getRes("line_zhe_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    var d = __define,c=LineZhe,p=c.prototype;
    p.recycle = function () {
        var self = this;
        egret.Tween.get(this).to({ alpha: 0.2 }, 300).call(function () {
            self.parent && self.parent.removeChild(self);
            self.alpha = 1;
            ObjectPool.getPool(LineZhe.NAME).returnObject(self);
        }, this);
    };
    LineZhe.NAME = "LineZhe";
    return LineZhe;
})(BaseLine);
egret.registerClass(LineZhe,'LineZhe');
