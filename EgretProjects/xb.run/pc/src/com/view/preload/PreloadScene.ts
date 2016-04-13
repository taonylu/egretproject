/**
 * 预加载场景
 * @author 
 *
 */
class PreloadScene extends BaseScene{
    private progressLabel:eui.Label;
    
	public constructor() {
        super("PreloadSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.progressLabel.text = "0%";
    }
    
    public setProgress(process:number){
        if(this.inited){
            this.progressLabel.text = process.toString() + "%";
        }    
    }
}
