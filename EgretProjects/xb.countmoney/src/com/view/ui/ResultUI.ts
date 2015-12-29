/**
 * 结果UI
 * @author 
 *
 */
class ResultUI extends BaseUI{
    private resultLabel: eui.Label; //结果文本
    private startBtn: eui.Image;    //开始按钮
    private rankBtn: eui.Image;     //排行榜按钮
    private shareBtn: eui.Image;    //分享按钮
    
	public constructor() {
        super("ResultUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
    
    public showInScene(doc:egret.DisplayObjectContainer, totalMoney:number): void {
        this.y = (GameConst.stage.stageHeight - this.height) / 2;
        doc.addChild(this);
        
        this.setResultLabel(totalMoney);
        
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtnTouch,this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRankBtnTouch,this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
    }
    
    public hide(): void {
        this.parent && this.parent.removeChild(this);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtnTouch,this);
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRankBtnTouch,this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
    }
    
    private onStartBtnTouch(): void {
        this.hide();
        GameManager.getInstance().gameScene.startGame();
    }
    
    private onRankBtnTouch(): void {

    }
    
    private onShareBtnTouch(): void {

    }
    
    public setResultLabel(totalMoney: number): void {
        this.resultLabel.text = "获得了xxxxx，超过了xxxx";
    }
    
    
    
}
















