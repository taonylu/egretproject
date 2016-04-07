/**
 * 水池
 * @author 
 *
 */
class Water extends BaseItem{
    public static NAME: string = "Water";
    public constructor() {
        super();
        this.bitmapData = RES.getRes("item_water_png");
        this.anchorOffsetX = this.width / 2 - 15;
        this.anchorOffsetY = this.height;
        this.type = 2;
    }
}
