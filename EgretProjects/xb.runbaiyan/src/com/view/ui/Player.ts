/**
 * 玩家
 * @author 
 *
 */
class Player extends egret.Bitmap{
    public row: number;
    public col: number;
    
    private textureList:Array<egret.Texture> = [];
    
	public constructor() {
        super();
        this.textureList[0] = RES.getRes("game_girl0_png");
        this.textureList[1] = RES.getRes("game_girl1_png");
        this.textureList[2] = RES.getRes("game_girl2_png");
        
        this.texture = this.textureList[0];
        
        this.anchorOffsetX = this.width / 2;     //调整player的大小和中心点
        this.anchorOffsetY = this.height - 15;
        
        
	}
	
    private bShake: Boolean = false;
    public shakeHead(): void {
        if(this.bShake) {
            return;
        }
        this.bShake = true;
        var self: Player = this;
        egret.Tween.get(this,{ loop: true}).call(function() {
            self.texture = self.textureList[1];
        }).wait(300).
            call(function() {
                self.texture = self.textureList[2];    
            }).wait(300);
    }
	
    public stopShake(): void {
        this.bShake = false;
        egret.Tween.removeTweens(this);
        this.texture = this.textureList[0];
    }
	
	
}













