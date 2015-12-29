/**
*  功    能：选择框
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
class SelectUI extends egret.Sprite{
    private selectMini: egret.Bitmap;  
    private selectBig: egret.Bitmap;
    private timer: egret.Timer = new egret.Timer(300);
    
	public constructor() {
        super();
        this.selectMini = new egret.Bitmap(RES.getRes("select0_png"));
        this.selectBig = new egret.Bitmap(RES.getRes("select1_png"));
        this.addChild(this.selectMini);
        this.addChild(this.selectBig);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler,this);
	}
    
    //在目标处播放动画
    public play(target:BlockUI): void {
        this.x = target.x - 15;
        this.y = target.y - 15;
        target.parent.addChild(this);
        this.timer.reset();
        this.timer.start();
        this.selectMini.visible = true;
        this.selectBig.visible = false;
    }
    
    //停止动画，并从舞台移除
    public hide(): void {
        this.parent && this.parent.removeChild(this);
        this.timer.stop();
        this.selectMini.visible = true;
        this.selectBig.visible = false; 
    }
    
    //每隔时间切换显示状态
    private onTimerHandler(e:egret.TimerEvent): void {
        if(this.timer.currentCount % 2 == 0) {
            this.selectMini.visible = true;
            this.selectBig.visible = false;
        } else {
            this.selectMini.visible = false;
            this.selectBig.visible = true;
        }
    }
    
}













