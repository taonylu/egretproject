/**
 * 首页的排行榜头像
 * @author 
 *
 */
class RankHeadUI extends BaseUI{
    public p1HeadUI:HeadUI;   //玩家头像
    public p2HeadUI:HeadUI; 
    public stageLabel:eui.BitmapLabel; //第几关
    public waveLabel:eui.BitmapLabel;  //第几波
    
	public constructor() {
    	super();
    	this.skinName = "RankHeadSKin";
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
    }
    
    //设置头像
    public setHead(p1HeadUrl:string, p2HeadUrl:string){
        if(p1HeadUrl != ""){
            this.p1HeadUI.loadImg(p1HeadUrl);
        }
        if(p2HeadUrl != ""){
            this.p2HeadUI.loadImg(p2HeadUrl); 
        }
    }
    
    //设置历史关卡
    public setHistory(stage:number, wave:number){
        if(stage < 3){
            this.stageLabel.text = "-  STAGE" + stage;
            this.waveLabel.text = "";
        }else{
            this.stageLabel.text = "-  S" + stage;
            this.waveLabel.text = "WAVE." + wave;
        }
    }
    
    public clear(){
        this.stageLabel.text = "";
        this.waveLabel.text = "";
        this.p1HeadUI.clear();
        this.p2HeadUI.clear();
    }
}
