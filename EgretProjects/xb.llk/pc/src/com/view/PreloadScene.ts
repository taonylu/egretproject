/**
 *
 * @author 
 *
 */
class PreloadScene extends BaseScene{
    private bar:eui.Image;
    private progressLabel:eui.Label;
    
	public constructor() {
    	super("PreloadSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
    
    public setProgress(progress:number){
        if(this.inited){
            this.bar.scaleX = 0.15 + progress/100*1.5;
            this.progressLabel.text = progress + "%";
        }
    }
	
}
