/**
 * 5分数字
 * @author 
 *
 */
class Score5 extends BaseItem{
    public static NAME:string = "Score5";
	public constructor() {
        super("num5");
	}
	
	public recycle(){
    	this.hide();
    	ObjectPool.getPool(Score5.NAME).returnObject(this);
	}
}
