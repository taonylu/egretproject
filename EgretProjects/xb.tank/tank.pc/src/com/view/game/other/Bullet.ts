/**
 * 子弹
 * @author 
 *
 */
class Bullet extends egret.Bitmap{
    public static NAME:string = "Bullet";
    public speed:number = 0;   //子弹速度
    public speedX:number = 0;  //移动速度
    public speedY:number = 0;
    public power:number = 0;  //威力
    public type:TankEnum = 0;   //子弹发射方
	public constructor() {
    	super();
    	this.bitmapData = RES.getRes("");
	}
	
	public reset(){
    	
	}
	
	public recycle(){
    	this.parent && this.parent.removeChild(this);
    	ObjectPool.getPool(Bullet.NAME).returnObject(this);
	}
}
