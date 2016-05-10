/**
 * 预加载场景
 * @author 
 *
 */
class PreloadScene extends BaseScene{
    private progressLabel:eui.Label;
    private enemyTank:eui.Image;
    private bullet:eui.Image;
    private boom:TankBoom;
    private bar:eui.Rect;
    
	public constructor() {
        super("PreloadSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.boom = new TankBoom();
        this.bar.scaleX = 0;
    }
    
    public setProgress(process:number){
        if(this.inited){
            //this.progressLabel.text = process.toString() + "%";
            this.bullet.x = this.bar.x + process/100*this.bar.width;
            this.bar.scaleX = process/100;
            if(process >= 100 && this.enemyTank.visible){
                this.enemyTank.visible = false;
                this.bullet.visible = false;
                this.boom.x = this.enemyTank.x;
                this.boom.y = this.enemyTank.y;
                this.addChild(this.boom);
                this.boom.playBoom();
                var self:PreloadScene = this;
                egret.Tween.get(this).wait(500).call(function(){
                    self.dispatchEvent(new egret.Event("BoomComplete"));
                });
            }
        }    
    }
}
