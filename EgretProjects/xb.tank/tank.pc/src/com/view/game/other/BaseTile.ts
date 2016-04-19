/**
 * 地形基类
 * @author 
 *
 */
class BaseTile extends egret.Bitmap{
    public static NAME:string = "BaseTile";
    public type:TileEnum;    //类型
    public life:number = 0;  //生命值
    
	public constructor() {
    	super();
	}
	
	//设置类型
	public setType(type:TileEnum){
    	this.type = type;
    	this.bitmapData = RES.getRes("tile" + type + "_png");
	}
	
    /**
     * 被攻击
     * @target 子弹
     * @return 返回击中是否有效 
     */ 
    public beAttacked(target: Bullet):boolean {
        return true;
    }
}
