/**
 * 计时器UI
 * @author 
 *
 */
class TimerUI extends egret.DisplayObjectContainer{
    public timeBg: egret.Bitmap;
    private timeText: egret.TextField;
    
	public constructor() {
        super();
        
        this.timeBg = new egret.Bitmap(RES.getRes("timebg_png"));
        this.addChild(this.timeBg);
        
        this.timeText = new egret.TextField();
        this.timeText.width = 120;
        this.timeText.height = 50;
        this.timeText.textAlign = egret.HorizontalAlign.CENTER;
        this.timeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.timeText.x = this.timeBg.x + (this.timeBg.width - this.timeText.width) / 2;
        this.timeText.y = this.timeBg.y + (this.timeBg.height - this.timeText.height) / 2;
        this.addChild(this.timeText);
	}
	
    public setTimeText(time: number): void {
        this.timeText.text = "时间:" + time.toString();
    }
}










