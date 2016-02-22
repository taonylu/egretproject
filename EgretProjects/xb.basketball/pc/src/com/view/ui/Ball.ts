/**
 * 篮球
 * @author 
 *
 */
class Ball extends FrameMovie{
    public static NAME:string = "Ball";
    public speedX:number = 0;       //x，y，z速度
    public speedY:number = 0;
    public speedZ:number = 0;      
    public z:number = 0;                  //虚拟z轴
    public realY:number = 0;           //真实y值，不算z距离导致的视差
    
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
