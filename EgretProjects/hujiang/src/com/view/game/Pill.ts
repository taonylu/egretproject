/**
 *
 * @author 
 *  下落的药丸
 */
class Pill extends BasePill{
    public static NAME: string = "Pill";
	public constructor() {
        super();
        var rand: number = Math.floor(Math.random() * 4);  //随机0-3
        this.texture = RES.getRes("pill" + rand + "_png");
        this.score = 1;
	}
	
    public recycle(): void {
        ObjectPool.getPool(Pill.NAME).returnObject(this);
    }
}
