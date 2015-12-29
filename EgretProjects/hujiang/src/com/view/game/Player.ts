/**
 *
 * @author 
 *
 */
class Player extends egret.Bitmap{
    private sleepTexture: egret.Texture;
    private eatTexture: egret.Texture;
    
	public constructor() {
        super();
        this.sleepTexture = RES.getRes("player0_png");
        this.eatTexture = RES.getRes("player1_png");
        this.texture = this.sleepTexture;
	}
	
	//吃东西时显示
    public eat(): void {
        var self: Player = this;
        this.texture = this.eatTexture;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).wait(150).call(function() {   //播放吃的表情
            self.texture = self.sleepTexture;
        });
    }
	
}
