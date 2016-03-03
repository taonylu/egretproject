/**
 * 倒计时UI
 * @author 
 *
 */
class CountDownUI extends BaseUI{
    private timeLabel:eui.Label;
    
	public constructor() {
    	super("CountDownUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
    
    public show(doc:egret.DisplayObjectContainer){
        this.x = (GameConst.stage.stageWidth - this.width)/2;
        this.y = (GameConst.stage.stageHeight - this.height)/2;
        doc.addChild(this);
    }
    
    public setTimeLabel(time:number){
        this.timeLabel.text = time + "";
    }
    
    public hide(){
        this.parent && this.parent.removeChild(this);
    }
}
