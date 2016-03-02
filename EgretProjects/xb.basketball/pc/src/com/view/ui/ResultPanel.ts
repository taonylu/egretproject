/**
 *
 * @author 
 *
 */
class ResultPanel extends BaseUI{
    private scoreLabel:eui.Label;
    
	public constructor() {
    	super("ResultPanelSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
    
    public setScore(score:number){
        this.scoreLabel.text = score + "";
    }
}
