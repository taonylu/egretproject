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
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        this.type = 0;
    }
}
