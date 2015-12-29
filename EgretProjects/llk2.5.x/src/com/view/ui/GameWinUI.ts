/**
*  功    能：游戏胜利面板
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
class GameWinUI extends BaseUI{
    private retryBtn: eui.Button;
    private nextBtn: eui.Button;
    private scoreLabel: eui.Label;
    
    private tempScore: number;
    
	public constructor() {
        super();
        this.skinName = "resource/myskins/GameWinUISkin.exml";
	}
	
    public componentCreated(): void {
        super.componentCreated();  
        this.setScoreLabel(this.tempScore);
        this.configListeners();
    }
    
    public show(doc: egret.DisplayObjectContainer):void {
        doc.addChild(this);
        this.x = doc.width/2 - this.width / 2;
        this.y = doc.height / 2 - this.height / 2;
    }
    
    private configListeners(): void {
        this.retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRetryBtnTouch,this);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtnTouch,this);
    }

    private onRetryBtnTouch(): void {
        console.log("touch retrybtn");
        GameManager.getInstance().gameScene.quitGame();
    }
    
    private onNextBtnTouch(): void {
        console.log("touch nextbtn");
        //GameManager.getInstance().sendSubmit(this.tempScore);
        var gameScene: GameScene = GameManager.getInstance().gameScene;
        gameScene.starGame(gameScene.curLevel + 1);
    }
    
    public setScoreLabel(score: number): void {
        this.tempScore = score;
        if(this.inited) {
            this.scoreLabel.text = "分数：" + this.tempScore;
        }
    }
    
    public hide(): void {
        this.parent && this.parent.removeChild(this);
        this.setScoreLabel(0);
    }
    
}









