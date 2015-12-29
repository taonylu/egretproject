/**
 *
 * @author 
 *
 */
class Pill5 extends BasePill{
    public static NAME: string = "Pill5";
	public constructor() {
        super();
        this.texture = RES.getRes("pill4_png");
        this.score = 5;
	}
	
    public recycle(): void {
        ObjectPool.getPool(Pill5.NAME).returnObject(this);
    }
}
