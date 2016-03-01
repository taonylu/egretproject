/**
 * 结束面板
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
	
    public showScore(score:number){
        this.scoreLabel.text = score.toString();
    }
}
