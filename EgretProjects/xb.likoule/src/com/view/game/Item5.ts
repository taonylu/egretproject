/**
 * 5分
 * @author 
 *
 */
class Item5 extends BaseItem{
    public static NAME:string = "Item5";
	public constructor() {
      super("item01");
    	this.score = 5;
	}
	
	public recycle(){
    	this.hide();
    	ObjectPool.getPool(Item5.NAME).returnObject(this);
	}
}
