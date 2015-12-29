/**
 * 格子背景
 * @author
 *
 */
var GridBg = (function (_super) {
    __extends(GridBg, _super);
    function GridBg() {
        _super.call(this, RES.getRes("game_grid0_png"));
        this.bHave = false; //是否已经占用
        this.touchEnabled = true;
    }
    var d = __define,c=GridBg,p=c.prototype;
    p.clean = function () {
        this.parentNode = null;
    };
    p.getPos = function () {
        return [this.row, this.col];
    };
    return GridBg;
})(egret.Bitmap);
egret.registerClass(GridBg,'GridBg');
