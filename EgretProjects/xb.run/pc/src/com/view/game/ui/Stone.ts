/**
 * 石头
 * @author 
 *
 */
class Stone extends BaseItem{
    public static NAME: string = "Stone";
    public constructor() {
        super();
        this.bitmapData = RES.getRes("stone_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }

    public recycle() {
        console.log("st");
        super.recycle();
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Stone.NAME).returnObject(this);
    }
}
