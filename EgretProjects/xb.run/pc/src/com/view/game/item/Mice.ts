/**
 * 地鼠
 * @author 
 *
 */
class Mice extends BaseItem{
    public static NAME: string = "Mice";
    public constructor() {
        super();
        this.bitmapData = RES.getRes("item_mice_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        this.type = 1;
    }
}
