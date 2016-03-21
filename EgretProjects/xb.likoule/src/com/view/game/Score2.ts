/**
 * 2分数字
 * @author 
 *
 */
class Score2 extends BaseItem{
    public static NAME:string = "Score2";
	public constructor() {
        super("num2");
	}
	
	public recycle(){
    	this.hide();
    	ObjectPool.getPool(Score2.NAME).returnObject(this);
	}
}
