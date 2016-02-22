/**
 * 篮球
 * @author 
 *
 */
class Ball extends FrameMovie{
    public static NAME:string = "Ball";
    public speedX:number = 0;
    public speedY:number = -30;
    public speedZ:number = 10;
    public z:number = 0;
    
	public constructor() {
    	super(new egret.Bitmap(RES.getRes("ball_png")), 1, 50,96,96);
    	this.anchorOffsetX = this.width/2;
    	this.anchorOffsetY = this.height/2;
	}
	
	public recycle(){
    	this.parent && this.parent.removeChild(this);
    	ObjectPool.getPool(Ball.NAME).returnObject(this);
	}
}
