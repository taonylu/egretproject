/**
 * 已占用格子
 * @author
 *
 */
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        _super.call(this, RES.getRes("game_grid1_png"));
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    var d = __define,c=Grid,p=c.prototype;
    Grid.NAME = "Grid";
    return Grid;
}(egret.Bitmap));
egret.registerClass(Grid,'Grid');
