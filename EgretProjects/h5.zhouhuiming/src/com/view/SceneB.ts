/**
 * 场景B
 * @author 
 *
 */
class SceneB extends BaseScene {
    private timeLabel:eui.Label;
    private phoneTimer:egret.Timer = new egret.Timer(1000);
    private phoneBtn:eui.Rect;
    
    public constructor() {
        super();
        this.skinName = "SceneBSkin"
    }

    public onCreated(): void {

    }

    public onEnable(): void {
        App.sndMgr.play(App.sndMgr.say)
        this.startTimer();
        this.phoneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public onRemove(): void {
        App.sndMgr.stop();
        this.stopTimer();
    }
    
    private onTouch(){
        this.nextScene();
    }
    
    
    private startTimer(){
        this.timeLabel.text = "00:00";
        this.phoneTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.phoneTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this);
        this.phoneTimer.repeatCount = 8;
        this.phoneTimer.reset();
        this.phoneTimer.start();
    }
    
    private onTimer(){
        this.timeLabel.text = "00:" + NumberTool.timeFormat(this.phoneTimer.currentCount);
    }
    
    private onComplete(){
        this.nextScene();
    }
    
    private stopTimer(){
        this.phoneTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this.phoneTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onComplete,this);
        this.phoneTimer.stop();
    }
    
    private nextScene(){
        this.phoneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        this.stopTimer();
        App.sndMgr.stop();
        App.layerMgr.runScene(App.sceneMgr.sceneC);
    }

}









