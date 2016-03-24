/**
 * 预加载场景
 * @author 
 *
 */
class PreloadScene extends BaseScene{
    private progressLabel:eui.Label;
    private beeGroup:eui.Group;
    private loadBar:eui.Image;
    private loadBg:eui.Image;
    private bee:SimpleMC;
    private barMask:eui.Rect;
    
	public constructor() {
        super("PreloadSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.progressLabel.text = "0%";
        this.loadBar.mask = this.barMask;
        this.barMask.scaleX = 0;
        this.bee = new SimpleMC("bee_png","bee_json","bee");
        this.bee.play(1000);
        this.beeGroup.addChild(this.bee);
    }
    
    public setProgress(process:number){
        if(this.inited){
            this.progressLabel.text = process.toString() + "%";
            this.barMask.scaleX = process/100;
            this.beeGroup.x = this.loadBg.x + this.loadBg.width*process/100 - this.beeGroup.width/2;
        }    
    }
    
    public destroy(){
        this.bee.parent && this.bee.parent.removeChild(this.bee);
        this.bee.stop();
        this.bee = null;
    }
}
