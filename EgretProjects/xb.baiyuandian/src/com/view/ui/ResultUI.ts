/**
 * 结算面板UI
 * @author 
 *
 */
class ResultUI extends BaseUI{
    private scoreLabel:eui.Label;
    private telLabel:eui.Label;
    
	public constructor() {
        super("ResultUISkin");
        
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
    }
    
    public setScoreLabel(score:number){
        this.scoreLabel.text = score.toString();
    }
    
    public setTelLabel(tel:string){
        this.telLabel.text = tel.toString();
    }
 
   
    
    //清理
    public clear(){
        this.scoreLabel.text = "";
        this.telLabel.text = "";
    }
    
	
}
