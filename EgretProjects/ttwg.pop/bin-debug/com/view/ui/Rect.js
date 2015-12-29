/**
* 格子UI
* @author
*/
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.call(this);
        this.isSelected = false;
        this.touchEnabled = true;
    }
    var d = __define,c=Rect;p=c.prototype;
    p.changeColor = function (color) {
        switch (color) {
            case 0 /* Red */:
                this.texture = RES.getRes("red_png");
                break;
            case 1 /* Blue */:
                this.texture = RES.getRes("blue_png");
                break;
            case 2 /* Green */:
                this.texture = RES.getRes("green_png");
                break;
            default:
                console.log("RectUI颜色不正确");
                return;
        }
        this.color = color;
    };
    Rect.NAME = "Rect";
    return Rect;
})(egret.Bitmap);
egret.registerClass(Rect,"Rect");
