/**
*  功    能：爆炸效果
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
class BoomUI extends egret.Bitmap{
	public static NAME:string = "BoomUI";
	public constructor() {
        super();
        this.texture = RES.getRes("cloud_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
	}

	public play(target:BlockUI):void{
        this.x = target.x + this.width/2;
        this.y = target.y + this.height/2;
        target.parent.addChild(this);
        
        var self: BoomUI = this;
        egret.Tween.get(this).to({ alpha: 0.3 ,rotation:360},500).call(function(): void {
            self.parent.removeChild(self);
            self.alpha = 1;
            self.rotation = 0;
            ObjectPool.getPool(BoomUI.NAME).returnObject(self);
        });
	}
}
