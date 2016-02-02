/**
 * 游戏失败界面
 * @author 
 *
 */
class GameLoseScene extends BaseScene{
    private wrongPacket:eui.Image;
    
	public constructor() {
        super("GameLoseSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }

    public onEnable(): void {
        this.wrongPacket.alpha = 1;
        egret.Tween.get(this.wrongPacket).wait(1200).to({ alpha: 0 },800).call(function() {
            LayerManager.getInstance().runScene(GameManager.getInstance().submitScene);
        },this);
    }
    
    public onRemove(): void {

    }
}
