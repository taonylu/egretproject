/**
 * 连线竖
 * @author 
 *
 */
class LineSu extends BaseLine{
    public static NAME: string = "LineSu";
	public constructor() {
    	super();
    	this.bitmapData = RES.getRes("line_su_png");
    	this.anchorOffsetX = this.width/2;
    	this.anchorOffsetY = this.height/2;
	}
	
    public recycle() {
        var self: LineSu = this;
        egret.Tween.get(this).to({ alpha: 0.2 },300).call(function() {
            self.parent && self.parent.removeChild(self);
            self.alpha = 1;
            ObjectPool.getPool(LineSu.NAME).returnObject(self);
        },this);
    }
}
