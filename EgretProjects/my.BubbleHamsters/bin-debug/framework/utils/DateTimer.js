/**
 * 根据系统时间的计时器
 * @author chenkai
 * @date 2016/12/30
 * Example:
 * var dateTimer:DateTimer = new DateTimer(1000);
 * dateTimer.addEventListeners(egret.TimerEvent.TIMER, this.onTimerHandler, this);
 * dateTimer.addEventListeners(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
 * dateTimer.reset();
 * dateTimer.start();
 */
var DateTimer = (function (_super) {
    __extends(DateTimer, _super);
    function DateTimer(delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 0; }
        _super.call(this);
        this.delay = delay;
        this.repeatCount = repeatCount;
    }
    var d = __define,c=DateTimer,p=c.prototype;
    p.start = function () {
        this.previous = egret.getTimer();
        this.accTime = 0;
        egret.startTick(this.update, this);
    };
    p.reset = function () {
        this.previous = egret.getTimer();
        this.accTime = 0;
        this.currentCount = 0;
    };
    p.stop = function () {
        egret.stopTick(this.update, this);
    };
    p.update = function () {
        this.curTime = egret.getTimer();
        this.passTime = this.curTime - this.previous;
        this.previous = this.curTime;
        this.accTime += this.passTime;
        while (this.accTime >= this.delay) {
            this.accTime -= this.delay;
            this.currentCount++;
            if (this.repeatCount > 0 && (this.currentCount == this.repeatCount)) {
                this.dispatchEvent(new egret.TimerEvent(egret.TimerEvent.TIMER_COMPLETE));
                this.stop();
            }
            this.dispatchEvent(new egret.TimerEvent(egret.TimerEvent.TIMER));
        }
        return false;
    };
    return DateTimer;
}(egret.EventDispatcher));
egret.registerClass(DateTimer,'DateTimer');
