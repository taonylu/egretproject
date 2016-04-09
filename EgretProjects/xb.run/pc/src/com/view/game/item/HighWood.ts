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
        this.type = 2;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
}
