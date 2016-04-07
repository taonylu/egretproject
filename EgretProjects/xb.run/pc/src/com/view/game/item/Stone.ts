/**
 * 石头
 * @author 
 *
 */
class Stone extends BaseItem{
    public static NAME: string = "Stone";
    public constructor() {
        super();
        this.bitmapData = RES.getRes("item_stone_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        this.type = 1;
    }
}
