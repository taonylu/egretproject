/**
 * 分数UI
 * @author 
 *
 */
class ScoreUI extends BaseUI{
    public static NAME:string = "ScoreUI";
    private scoreLabel:eui.Label;
    
	public constructor() {
    	super("ScoreUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
    }
    
    public show(item:BaseItem) {
        var self = this;
        this.x = item.x;
        this.y = item.y;
        this.scoreLabel.text = "+" + item.score + "";
        item.parent.addChild(this);
        egret.Tween.get(this).to({ y: (this.y - 300)},500).call(function() {
            self.recycle();
        });
    }
    
    public recycle(){
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(ScoreUI.NAME).returnObject(this);
    }
}
