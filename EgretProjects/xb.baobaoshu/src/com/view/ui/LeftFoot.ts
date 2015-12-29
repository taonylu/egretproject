/**
 * 左脚印
 * @author 
 *
 */
class LeftFoot extends BaseFoot{
    public static NAME: string = "LeftFoot";
	public constructor() {
        super();
        this.bitmapData = RES.getRes("game_foot0_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.touchEnabled = false;
	}
	
    public recycle(): void {
        ObjectPool.getPool(LeftFoot.NAME).returnObject(this);
    }
}
