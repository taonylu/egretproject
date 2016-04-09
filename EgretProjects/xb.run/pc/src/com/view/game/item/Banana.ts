/**
 * 香蕉
 * @author 
 *
 */
class Banana extends BaseItem{
    public static NAME: string = "Banana";
    public constructor() {
        super();
        this.bitmapData = RES.getRes("item_banana_png");
        this.type = 0;
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.score = 10;
    }
}
