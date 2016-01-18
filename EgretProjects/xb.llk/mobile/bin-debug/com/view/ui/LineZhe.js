/**
 * 连线折
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
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(LineZhe.NAME).returnObject(this);
    };
    LineZhe.NAME = "LineZhe";
    return LineZhe;
})(egret.Bitmap);
egret.registerClass(LineZhe,'LineZhe');
