/**
 *
 * @author 
 *
 */
class PoisonPill extends BasePill{
    public static NAME: string = "PoisonPill";
	public constructor() {
        super();
        this.texture = RES.getRes("pill6_png");
	}
	
    public recycle(): void {
        ObjectPool.getPool(PoisonPill.NAME).returnObject(this);
    }
	
}
