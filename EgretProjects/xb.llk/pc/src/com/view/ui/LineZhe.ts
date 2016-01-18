/**
 * 连线折
 * @author 
 *
 */
class LineZhe extends egret.Bitmap {
    public static NAME: string = "LineZhe";
    public constructor() {
        super();
        this.bitmapData = RES.getRes("line_zhe_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }

    public recycle() {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(LineZhe.NAME).returnObject(this);
    }
}