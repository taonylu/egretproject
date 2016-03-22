/**
 *
 * @author 
 *
 */
class Ball extends SimpleMC{
    public static NAME:string = "Ball";
    public score:number = 20;
	public constructor() {
    	super("ball_png","ball_json","ball");
	}
	
	public recycle(){
    	  this.stop();
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Ball.NAME).returnObject(this);
	}
}
