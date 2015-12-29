/**
 * 游戏结算界面
 * @author 羊力大仙
 *
 */
class GameOverUI extends BaseUI{
    
    private startBtn: eui.Button;
    private scoreLabel: eui.Label;
    
	public constructor() {
        super();
        this.skinName = "resource/myskins/ui/GameOverUISkin.exml";
	}
	
    public show(doc:egret.DisplayObjectContainer): void {
        doc.addChild(this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startBtnTouch,this);
        this.scoreLabel.text = GameManager.getInstance().gameScene.score.toString();
    }
    
    public hide(): void {
        this.parent && this.parent.removeChild(this);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.startBtnTouch,this);
    }
    
    private startBtnTouch(): void {
        this.hide();
        GameManager.getInstance().gameScene.resetGame();
    }
	
}















