/**
 * 子弹
 * @author 
 *
 */
class Bullet extends egret.Bitmap{
    public static NAME:string = "Bullet";
    public speed:number = 8;          //子弹速度
    public speedX:number = 0;         //移动速度
    public speedY:number = 0;
    public power:number = 0;          //威力
    public type:TankEnum = 0;         //子弹发射方
    public hitWidth: number = 16;     //碰撞检测范围，因为切图大小并不是64x64，所以不能取width判断碰撞范围，这里自定义一个变量
    public hitHalfWidth: number = 8;
    public owner:BaseTank;            //子弹拥有者
    public bulletSpeed;
    
	public constructor() {
    	super();
    	this.bitmapData = RES.getRes("bullet_png");
    	this.anchorOffsetX = 16;
    	this.anchorOffsetY = 16;
        this.bulletSpeed = MapManager.getInstance().itemSet.bulletSpeed;
	}
	
	//子弹威力
	public setPower(power:number){
    	this.power = power;
      this.speed = this.bulletSpeed[this.power-1];
	}
	
	public move(){
    	this.x += this.speedX;
    	this.y += this.speedY;
	}
	
	//返回是否碰撞
    public checkCollision(target){
        if(Math.abs(this.x - target.x) < (target.hitHalfWidth + this.hitHalfWidth) && 
            Math.abs(this.y - target.y) < (target.hitHalfWidth + this.hitHalfWidth)){
                return true;    
            }
        return false;
    }
	
	public reset(){
    	this.speedX = 0;
    	this.speedY = 0;
    	this.power = 1;
    	this.rotation = 0;
    	this.owner = null;
	}
	
	public recycle(){
    	this.reset();
    	this.parent && this.parent.removeChild(this);
    	ObjectPool.getPool(Bullet.NAME).returnObject(this);
	}
}
