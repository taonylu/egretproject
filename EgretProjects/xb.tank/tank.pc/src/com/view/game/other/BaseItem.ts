/**
 * 道具基类
 * @author 
 *
 */
class BaseItem extends egret.Bitmap{
    public static NAME:string = "BaseItem";
    public type:ItemEnum;  //道具类型 0护盾，1枪，2星星，3基地护甲，4命，5手雷，6暂停
    
	public constructor() {
    	super();
	}
	
	//设置道具类型
	public setType(_type:ItemEnum){
    	 this.type = _type;
    	 this.bitmapData = RES.getRes("item" + _type + "_png");
    	 this.anchorOffsetX = 32;
    	 this.anchorOffsetY = 32;
	}
	
	//闪烁效果
	public startFlash(){
    	 egret.Tween.get(this,{loop:true}).wait(200).to({alpha:0}).wait(200).to({alpha:1});
	}
	
	//停止闪烁效果
	public stopFlash(){
    	this.alpha = 1;
    	egret.Tween.removeTweens(this);
	}
	
	//碰撞检测
	public checkCollision(target){
        if(Math.abs(this.x - target.x) < 64 && Math.abs(this.y - target.y)<64){
            return true;
        }
        return false;
	}
	
	//回收
	public recycle(){
    	this.stopFlash();
    	this.parent && this.parent.removeChild(this);
    	ObjectPool.getPool(BaseItem.NAME).returnObject(this);
	}
}
