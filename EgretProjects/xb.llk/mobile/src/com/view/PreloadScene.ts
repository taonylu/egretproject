/**
 * 预加载界面
 * @author 
 *
 */
class PreloadScene extends BaseScene{
    public bar:eui.Image;
    private barStart:number = 0.15;
    private barEnd:number = 1.45;
    
	public constructor() {
    	super("PreloadSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
    }
    
    public setProgress(progress:number){
        if(this.inited){
            this.bar.scaleX = this.barStart + progress * (this.barEnd - this.barStart);
        }
    }
}
