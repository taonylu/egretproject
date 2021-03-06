/**
 * 篮球
 * @author 
 *
 */
class Ball extends SimpleMC{
    public static NAME:string = "Ball";
    public speedX:number = 0;       //x，y，z速度
    public speedY:number = 0;
    public speedZ:number = 0;      
    public z:number = 0;            //虚拟z轴
    public realY:number = 0;        //真实y值，不算z距离导致的视差
    public shadow:egret.Bitmap;     //球影子
    public bShoot:Boolean = false;  //是否进球，用于判断该球是否碰撞检测
    public bTouchWall:Boolean = false; //是否碰撞到墙，用于下落后迅速滚动回来
    
	public constructor() {
    	super("ball_png","ball_json","ball");
    	
    	this.anchorOffsetX = this.width/2;
    	this.anchorOffsetY = this.height/2;
    	
    	this.shadow = new egret.Bitmap(RES.getRes("shadow_png"));
    	this.shadow.anchorOffsetX = this.shadow.width/2;
  
	}

	
	public recycle(){
      this.stop();
    	this.realY = 0;
    	this.bShoot = false;
    	this.bTouchWall = false;
    	this.shadow.parent && this.shadow.parent.removeChild(this.shadow);
    	this.parent && this.parent.removeChild(this);
    	ObjectPool.getPool(Ball.NAME).returnObject(this);
	}
}
