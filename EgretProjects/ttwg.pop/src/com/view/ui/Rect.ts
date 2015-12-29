/**
* 格子UI
* @author 
*/

class Rect extends egret.Bitmap {
    public static NAME: string = "Rect";
    public color: RectColor;
    public row: number;
    public col: number;
    public isSelected: boolean = false;

    public constructor() {
        super();
        this.touchEnabled = true;
    }

    public changeColor(color: RectColor): void {
        switch(color) {
            case RectColor.Red:
                this.texture = RES.getRes("red_png");
                break;
            case RectColor.Blue:
                this.texture = RES.getRes("blue_png");
                break;
            case RectColor.Green:
                this.texture = RES.getRes("green_png");
                break;
            default:
                console.log("RectUI颜色不正确");
                return;
        }
        this.color = color;
    }
}
    