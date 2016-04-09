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
        this.type = 1;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
}
