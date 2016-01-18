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
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(LineSu.NAME).returnObject(this);
    };
    LineSu.NAME = "LineSu";
    return LineSu;
})(egret.Bitmap);
egret.registerClass(LineSu,'LineSu');
