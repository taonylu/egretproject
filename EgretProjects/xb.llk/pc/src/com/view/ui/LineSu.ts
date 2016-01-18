/**
 * 连线竖
 * @author 
 *
 */
class LineSu extends egret.Bitmap{
    public static NAME:string = "LineSu";
	public constructor() {
    	super();
    	this.bitmapData = RES.getRes("line_su_png");
    	this.anchorOffsetX = this.width/2;
    	this.anchorOffsetY =this.height/2;
	}
	
	public recycle(){
    	this.parent && this.parent.removeChild(this);
    	ObjectPool.getPool(LineSu.NAME).returnObject(this);
	}
}
