/**
 * 子弹
 * @author 
 *
 */
class Bullet extends egret.Bitmap{
    public static NAME:string = "Bullet";
    public speed:number = 8;   //子弹速度
    public speedX:number = 0;  //移动速度
    public speedY:number = 0;
    public power:number = 0;  //威力
    public type:TankEnum = 0;   //子弹发射方
	public constructor() {
    	super();
    	this.bitmapData = RES.getRes("bullet_png");
    	this.anchorOffsetX = 16;
    	this.anchorOffsetY = 16;
	}
	
	public move(){
    	this.x += this.speedX;
    	this.y += this.speedY;
	}
	
	public reset(){
    	this.speedX = 0;
    	this.speedY = 0;
    	this.power = 1;
    	this.rotation = 0;
	}
	
	public recycle(){
    	this.reset();
    	this.parent && this.parent.removeChild(this);
    	ObjectPool.getPool(Bullet.NAME).returnObject(this);
	}
}
