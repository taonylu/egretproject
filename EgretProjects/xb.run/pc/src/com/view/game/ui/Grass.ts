/**
 * 草地
 * @author 
 *
 */
class Grass extends egret.Bitmap{
    public static NAME:string = "Grass";
    public speedX:number = 3;
	public constructor(value:string) {
    	super();
	}
	
	public randomSkin(){
    	  this.texture = RES.getRes("game_grass" + NumberTool.getRandomInt(0,2) + "_png");
	}
	
	public recycle(){
    	this.parent && this.parent.removeChild(this);
    	ObjectPool.getPool(Grass.NAME).returnObject(this);
	}
}
