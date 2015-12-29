/**
* 格子UI
* @author 
*
*/

enum TileColor { Red,Blue,Yellow,Green,Purple };

class TileUI extends egret.Bitmap{
        
    public color: TileColor;
    public row: number;
    public col: number;
    public isSelected:boolean = false;
        
    public constructor() {
        super();
        this.touchEnabled = true;
    }
    
    public changeColor(color:TileColor): void { 
    switch(color) { 
        case TileColor.Red:
        this.texture = RES.getRes("star_red_png");
        break;
        case TileColor.Blue:
        this.texture = RES.getRes("star_blue_png");
        break;
        case TileColor.Green:
        this.texture = RES.getRes("star_green_png");
        break;
        case TileColor.Yellow:
        this.texture = RES.getRes("star_yellow_png");
        break;
        case TileColor.Purple:
        this.texture = RES.getRes("star_purple_png");
        break;
        default:
        console.log("TileUI颜色不正确");
        return;
    }
    this.color = color;
}
    	
    /*public changeColor(color:TileColor): void { 
        switch(color) { 
            case TileColor.Red:
            this.source = RES.getRes("star_red_png");
            break;
            case TileColor.Blue:
            this.source = RES.getRes("star_blue_png");
            break;
            case TileColor.Green:
            this.source = RES.getRes("star_green_png");
            break;
            case TileColor.Yellow:
            this.source = RES.getRes("star_yellow_png");
            break;
            case TileColor.Purple:
            this.source = RES.getRes("star_purple_png");
            break;
            default:
            console.log("TileUI颜色不正确");
            return;
        }
        this.color = color;
    }*/
    
    	
    }
    