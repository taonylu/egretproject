/**
 * 连线竖
 * @author 
 *
 */
class LineZhe extends BaseLine{
    public static NAME: string = "LineZhe";
	public constructor() {
    	super();
    	this.bitmapData = RES.getRes("line_zhe_png");
    	this.anchorOffsetX = this.width/2;
    	this.anchorOffsetY = this.height/2;
	}
	
	public recycle(){
    	var self:LineZhe = this;
    	egret.Tween.get(this).to({alpha:0.2},300).call(function(){
            self.parent && self.parent.removeChild(self);
            self.alpha = 1;
            ObjectPool.getPool(LineZhe.NAME).returnObject(self);
    	},this);
	}
}
