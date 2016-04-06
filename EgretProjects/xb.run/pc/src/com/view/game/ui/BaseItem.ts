/**
 * 水果基类
 * @author 
 *
 */
class BaseItem extends egret.Bitmap{
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
	
	public recycle(){
    	
	}
}
