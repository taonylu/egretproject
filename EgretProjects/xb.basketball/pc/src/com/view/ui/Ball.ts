/**
 * 篮球
 * @author 
 *
 */
class Ball extends FrameMovie{
    public static NAME:string = "Ball";
	public constructor() {
    	super(new egret.Bitmap(RES.getRes("ball_png")), 1, 50,96,96);
	}
	
	public recycle(){
    	this.parent && this.parent.removeChild(this);
    	ObjectPool.getPool(Ball.NAME).returnObject(this);
	}
}
