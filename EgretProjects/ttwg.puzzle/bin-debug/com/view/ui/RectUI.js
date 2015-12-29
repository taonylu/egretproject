/**
 * 白色的方块，用于形成镂空效果
 * @author
 *
 */
var RectUI = (function (_super) {
    __extends(RectUI, _super);
    function RectUI() {
        _super.call(this);
        this.graphics.beginFill(0xffffff);
        this.graphics.drawRect(0, 0, GameConst.cellWidth, GameConst.cellWidth);
        this.graphics.endFill();
    }
    var d = __define,c=RectUI;p=c.prototype;
    return RectUI;
})(egret.Sprite);
egret.registerClass(RectUI,"RectUI");
