/**
 * 胡萝卜
 * @author 
 *
 */
class Carrot extends BaseItem{
    public static NAME:string = "Carrot";
	public constructor() {
    	super();
    	this.bitmapData = RES.getRes("item_carrot_png");
    	this.score = 10;
      this.type = 0;
    	this.anchorOffsetX = this.width/2;
    	this.anchorOffsetY = this.height;
	}
	
	
}
