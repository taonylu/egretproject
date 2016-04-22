/**
 * 地形基类
 * @author 
 *
 */
class BaseTile extends egret.Bitmap{
    public static NAME:string = "BaseTile";
    public className: string = "";//类名
    public type:TileEnum;    //类型
    public life:number = 0;  //生命值
    public row:number;
    public col:number;
    public canHit:boolean = false;  //可以被击中
    public canWalk:boolean = false; //能够行走
    
	public constructor() {
    	super();
      this.className = egret.getQualifiedClassName(this);
	}
	
	//设置类型
	public setType(type:TileEnum){
    	this.type = type;
    	this.bitmapData = RES.getRes("tile" + type + "_png");
    	this.anchorOffsetX = this.width/2;
    	this.anchorOffsetY = this.height/2;
	}
	
    /**
     * 被攻击
     * @target 子弹
     * @return 返回击中是否有效 
     */ 
    public beAttacked(target: Bullet):boolean {
        return true;
    }
    
    public reset(){
        
    }
    
    public recycle(){
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(this.className).returnObject(this);
    }
}
