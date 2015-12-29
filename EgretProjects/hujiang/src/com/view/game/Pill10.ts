/**
 *
 * @author 
 *
 */
class Pill10 extends BasePill{
    public static NAME: string = "Pill10";
	public constructor() {
        super();
        this.texture = RES.getRes("pill5_png");
        this.score = 10;
	}
	
    public recycle(): void {
        ObjectPool.getPool(Pill10.NAME).returnObject(this);
    }
}
