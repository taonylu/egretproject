/**
 * 计时器UI
 * @author
 *
 */
var TimerUI = (function (_super) {
    __extends(TimerUI, _super);
    function TimerUI() {
        _super.call(this);
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
    var d = __define,c=TimerUI;p=c.prototype;
    p.setTimeText = function (time) {
        this.timeText.text = "时间:" + time.toString();
    };
    return TimerUI;
})(egret.DisplayObjectContainer);
egret.registerClass(TimerUI,"TimerUI");
