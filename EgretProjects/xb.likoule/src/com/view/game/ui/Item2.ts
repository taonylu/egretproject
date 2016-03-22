/**
 * 2分
 * @author 
 *
 */
class Item2 extends BaseItem{
    public static NAME:string = "Item2";
    
	public constructor() {
      super("item00");
    	this.score = 2;
    	
	}
	
	public recycle(){
    	 this.hide();
    	 ObjectPool.getPool(Item2.NAME).returnObject(this);
	}
	
}
