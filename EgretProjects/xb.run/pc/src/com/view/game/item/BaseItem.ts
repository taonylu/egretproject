/**
 * 水果基类
 * @author 
 *
 */
class BaseItem extends egret.Bitmap{
    public type:number;       //物品类型  0可获取物品  1不可跨越障碍物 2可跨越障碍物
    public score:number = 0;  //分值
    public track:number = 0;  //赛道
	public constructor() {
    	super();
	}
	
	public changeAlpha(){
    	  var self = this;
        egret.Tween.get(this).to({ y: (this.y - 300),alpha: 0 },200).call(function() {
            self.recycle();
        });
	}
	
    public recycle() {
        this.parent && this.parent.removeChild(this);
        var className = egret.getQualifiedClassName(this);
        ObjectPool.getPool(className).returnObject(this);
    }
}
