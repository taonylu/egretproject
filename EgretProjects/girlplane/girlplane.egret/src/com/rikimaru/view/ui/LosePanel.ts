/**
*  文 件 名：LosePanel.ts
*  功    能   : 游戏失败弹出框
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/26
*  修改日期：2015/8/26
*  修改日志：
*/
class LosePanel extends egret.gui.SkinnableComponent{
    /**倒计时文本*/
    private timeLabel: egret.gui.Label;
    /**计时器*/
    private timer: egret.Timer;
    
	public constructor() {
        super();
        this.skinName = skins.ui.LosePanelSkin;
	}
	
    public childrenCreated(): void { 
        this.x = (GameConfig.stageWidth - this.width) / 2;
        this.y = (GameConfig.stageHeight - this.height) / 2;
    }
    
    public startTimer(): void { 
        if(this.timer == null) { 
            this.timer = new egret.Timer(1000);
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onComplete,this);
        }
        this.timer.delay = 1000;
        this.timer.repeatCount = 3;
        this.timer.reset();
        this.timer.start();
        GameScene.instance.gameGroup.addElement(this);
        
        this.timeLabel.text = "3";
    }
    
    private onTimer(e:egret.TimerEvent): void { 
        console.log("ontimer:" + this.timer.currentCount);
        this.timeLabel.text = (3 - this.timer.currentCount).toString();
    }
    
    private onComplete(): void { 
        console.log("onComplete:" + this.timer.currentCount);
        this.timer.stop();
        GameScene.instance.gameGroup.removeElement(this);
        LayerManager.getInstance().replaceScene(GameConfig.SN_Through,STween.R);
    }
}


















