/**
 *
 * @author 
 *
 */
class Player extends egret.DisplayObjectContainer{
    private bm0: egret.Bitmap;
    private bm1: egret.Bitmap;
    public speed: number;
    
	public constructor() {
        super();
        
        this.bm0 = new egret.Bitmap(RES.getRes("player0_png"));
        this.bm1 = new egret.Bitmap(RES.getRes("player1_png"));
        this.addChild(this.bm0);
        this.addChild(this.bm1);
        this.bm1.visible = false;
	}
	
    public eat(): void {
        this.bm0.visible = false;
        this.bm1.visible = true;
        var self: Player = this;
        egret.Tween.get(this).wait(100).call(function() {
            self.bm0.visible = true;
            self.bm1.visible = false;
        });
    }
}
