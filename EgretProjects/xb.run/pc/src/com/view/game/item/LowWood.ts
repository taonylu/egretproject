/**
 * 矮木桩
 * @author 
 *
 */
class LowWood extends BaseItem{
    public static NAME: string = "LowWood";
    public constructor() {
        super();
        this.bitmapData = RES.getRes("item_lowwood_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        this.type = 2;
    }
}
