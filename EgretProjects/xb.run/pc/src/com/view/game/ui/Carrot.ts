/**
 * 胡萝卜
 * @author 
 *
 */
class Carrot extends BaseItem{
    public static NAME:string = "Carrot";
	public constructor() {
    	super();
    	this.bitmapData = RES.getRes("carrot_png");
    	this.score = 10;
    	this.anchorOffsetX = this.width/2;
    	this.anchorOffsetY = this.height/2;
	}
	
	public recycle(){
    	super.recycle();
    	this.parent && this.parent.removeChild(this);
    	this.alpha = 1;
    	ObjectPool.getPool(Carrot.NAME).returnObject(this);
	}
}
