/**
 * 分数文本
 * @author 
 *
 */
class ScoreLabel extends BaseUI{
    public static NAME:string = "ScoreLabel";
    private scoreLabel:eui.BitmapLabel;
	public constructor() {
    	super();
    	this.skinName = "ScoreLabelSkin";
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.anchorOffsetX = 35;
        this.anchorOffsetY = 35;
    }
    
    public setScoreLabel(score:number){
        this.scoreLabel.text = score + "";
        var self:ScoreLabel = this;
        egret.Tween.get(this).wait(500).call(function(){
            self.recycle();
        },this);
    }
    
    public recycle(){
        this.parent && this.parent.removeChild(this);
        this.scoreLabel.text = "0";
        ObjectPool.getPool(ScoreLabel.NAME).returnObject(this);
    }
}
