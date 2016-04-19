/**
 * 道具基类
 * @author 
 *
 */
class BaseItem extends egret.Bitmap{
    public static NAME:string = "BaseItem";
    public type:ItemEnum;  //道具类型 0隐身，1枪，2星星，3基地护甲，4命，5手雷，6暂停
    
	public constructor() {
    	super();
	}
	
	//设置道具类型
	public setType(_type:ItemEnum){
    	 this.type = _type;
    	 this.bitmapData = RES.getRes("item" + _type + "_png");
	}
	
	
	
	//回收
	public recycle(){
    	this.parent && this.parent.removeChild(this);
    	ObjectPool.getPool(BaseItem.NAME).returnObject(this);
	}
}
