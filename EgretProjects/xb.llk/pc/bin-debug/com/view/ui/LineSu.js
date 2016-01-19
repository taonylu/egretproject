/**
 * 连线竖
 * @author
 *
 */
var LineSu = (function (_super) {
    __extends(LineSu, _super);
    function LineSu() {
        _super.call(this);
        this.bitmapData = RES.getRes("line_su_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    var d = __define,c=LineSu,p=c.prototype;
    p.recycle = function () {
        var self = this;
        egret.Tween.get(this).to({ alpha: 0.2 }, 300).call(function () {
            self.parent && self.parent.removeChild(self);
            self.alpha = 1;
            ObjectPool.getPool(LineSu.NAME).returnObject(self);
        }, this);
    };
    LineSu.NAME = "LineSu";
    return LineSu;
})(BaseLine);
egret.registerClass(LineSu,'LineSu');
