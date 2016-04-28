/**
 * 坦克出生时闪烁效果
 * @author 
 *
 */
class Flash extends SimpleMC{
    public static NAME:string = "Flash";
	public constructor() {
    	super();
    	this.setMovieClip("flash_png","flash_json","flash");
    	this.anchorOffsetX = 32;
    	this.anchorOffsetY = 32;
	}
	
	public playAnim(){
    	this.gotoAndPlay(1,1);
        this.addEventListener(egret.MovieClipEvent.COMPLETE,this.recycle, this);
	}
	
	public recycle(){
    	this.parent && this.parent.removeChild(this);
    	this.gotoAndStop(1);
    	ObjectPool.getPool(Flash.NAME).returnObject(this);
	}
}
