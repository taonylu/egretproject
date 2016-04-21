/**
 * 地形基类
 * @author 
 *
 */
class BaseTile extends egret.Bitmap{
    public static NAME:string = "BaseTile";
    public type:TileEnum;    //类型
    public life:number = 0;  //生命值
    public row:number;
    public col:number;
    
	public constructor() {
    	super();
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
        ObjectPool.getPool(BaseTile.NAME).returnObject(this);
    }
}
