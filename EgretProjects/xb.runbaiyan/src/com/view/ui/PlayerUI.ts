/**
 * 主页摇头的girl
 * @author 
 *
 */
class PlayerUI extends eui.Component{
    private girl0: eui.Image;
    private girl1: eui.Image;
    
	public constructor() {
        super();
	}
	
    public shakeHead(): void {
        this.girl0.visible = true;
        this.girl1.visible = false;
        
        var self: PlayerUI = this;
        egret.Tween.get(this,{ loop: true }).call(function() {
            self.girl0.visible = false;
            self.girl1.visible = true;
        }).wait(300).
            call(function() {
                self.girl0.visible = true;
                self.girl1.visible = false;
            }).wait(300);
    }

    public stopShake(): void {
        egret.Tween.removeTweens(this);
    }
}
