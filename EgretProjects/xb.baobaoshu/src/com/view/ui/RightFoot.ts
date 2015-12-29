/**
 * 右脚印
 * @author 
 *
 */
class RightFoot extends BaseFoot{
    public static NAME: string = "RightFoot";
    
    public constructor() {
        super();
        this.bitmapData = RES.getRes("game_foot1_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.touchEnabled = false;
    }
    
    public recycle(): void {
        ObjectPool.getPool(RightFoot.NAME).returnObject(this);
    }
}
