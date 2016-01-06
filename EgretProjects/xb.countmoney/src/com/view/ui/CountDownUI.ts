/**
 *
 * @author 
 *
 */
class CountDownUI extends BaseUI{
    private num1:eui.Image;
    private num2:eui.Image;
    private num3:eui.Image;
    
    private timer:egret.Timer;
    
	public constructor() {
    	super("CountDownUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.num2.visible = false;
        this.num1.visible = false;
        this.timer = new egret.Timer(800,3);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE ,this.onComplete, this);
    }
    
    public show():void{
        LayerManager.getInstance().popLayer.addChild(this);
        this.num3.visible = true;
        this.num2.visible = false;
        this.num1.visible = false;
        this.timer.reset();
        this.timer.start();
        
    }
    
    private onTimerHandler():void{
        if(this.timer.currentCount == 1){
            this.num3.visible = false;
            this.num2.visible = true;
        }else if(this.timer.currentCount == 2){
            this.num2.visible = false;
            this.num1.visible = true;
        }
    }
    
    private onComplete():void{
        this.parent && this.parent.removeChild(this);
        this.timer.stop();
        this.dispatchEvent(new egret.Event("countComplete"));
    }
}













