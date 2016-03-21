/**
 * 基础物品
 * @author 
 *
 */
class BaseItem extends egret.Bitmap{
    public score:number = 0;         //分值
    
	public constructor(skinName:string) {
    	super();
    	this.bitmapData = RES.getRes(skinName);
	}
	
	public reset(){
    	
	}
	
	public hide(){
    	this.parent && this.parent.removeChild(this);
	}
	
    public recycle() {

    }
}
