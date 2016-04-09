/**
 * 水果基类
 * @author 
 *
 */
class BaseItem extends egret.Bitmap{
    public type:number;       //物品类型  0可获取物品  1可跨越障碍物 2不可跨越障碍物
    public score:number = 0;  //分值
    public track:number = 0;  //赛道
    public className:string;  //类名
	public constructor() {
    	super();
        this.className = egret.getQualifiedClassName(this);
	}
	
	public changeAlpha(){
    	  var self = this;
        egret.Tween.get(this).to({ y: (this.y - 300),alpha: 0 },200).call(function() {
            self.recycle();
        });
	}
	
    public recycle() {
        this.alpha = 1;
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(this.className).returnObject(this);
    }
}
