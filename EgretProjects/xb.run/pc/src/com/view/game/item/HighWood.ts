/**
 * 高木桩
 * @author 
 *
 */
class HighWood extends BaseItem{
    public static NAME: string = "HighWood";
    public constructor() {
        super();
        this.bitmapData = RES.getRes("item_highwood_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        this.type = 1;
    }
}
