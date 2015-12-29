/**
* 格子UI
* @author
*
*/
var TileColor;
(function (TileColor) {
    TileColor[TileColor["Red"] = 0] = "Red";
    TileColor[TileColor["Blue"] = 1] = "Blue";
    TileColor[TileColor["Yellow"] = 2] = "Yellow";
    TileColor[TileColor["Green"] = 3] = "Green";
    TileColor[TileColor["Purple"] = 4] = "Purple";
})(TileColor || (TileColor = {}));
;
var TileUI = (function (_super) {
    __extends(TileUI, _super);
    function TileUI() {
        _super.call(this);
        this.isSelected = false;
        this.touchEnabled = true;
    }
    var __egretProto__ = TileUI.prototype;
    __egretProto__.changeColor = function (color) {
        switch (color) {
            case 0 /* Red */:
                this.texture = RES.getRes("star_red_png");
                break;
            case 1 /* Blue */:
                this.texture = RES.getRes("star_blue_png");
                break;
            case 3 /* Green */:
                this.texture = RES.getRes("star_green_png");
                break;
            case 2 /* Yellow */:
                this.texture = RES.getRes("star_yellow_png");
                break;
            case 4 /* Purple */:
                this.texture = RES.getRes("star_purple_png");
                break;
            default:
                console.log("TileUI颜色不正确");
                return;
        }
        this.color = color;
    };
    return TileUI;
})(egret.Bitmap);
TileUI.prototype.__class__ = "TileUI";
