/**
 * 震动工具
 * @author
 *
 */
var ShakeTool = (function () {
    function ShakeTool() {
        this.count = 0; //计时器次数
        this.timer = new egret.Timer(1000);
    }
    var d = __define,c=ShakeTool,p=c.prototype;
    ShakeTool.getInstance = function () {
        if (this.instance == null) {
            this.instance = new ShakeTool();
        }
        return this.instance;
    };
    /**
     * 震动显示对象
     * @param        target    震动目标对象
     * @param        time      震动持续时长（秒）
     * @param        rate      震动频率(一秒震动多少次)
     * @param        maxDis    震动最大距离
     */
    p.shakeObj = function (target, time, rate, maxDis) {
        this.target = target;
        this.initX = target.x;
        this.initY = target.y;
        this.maxDis = maxDis;
        this.count = time * rate;
        this.rate = rate;
        this.timer.delay = 1000 / rate;
        this.timer.repeatCount = this.count;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.shaking, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
        this.timer.reset();
        this.timer.start();
    };
    p.shaking = function () {
        egret.Tween.removeTweens(this);
        this.target.x = this.initX - this.maxDis + Math.random() * this.maxDis * 2; //中心点在左上角
        this.target.y = this.initY - this.maxDis + Math.random() * this.maxDis * 2;
        egret.Tween.get(this.target).to({ x: this.initX, y: this.initY }, 999 / this.rate);
    };
    p.shakeComplete = function () {
        egret.Tween.removeTweens(this);
        this.target.x = this.initX;
        this.target.y = this.initY;
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.shaking, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
    };
    return ShakeTool;
})();
egret.registerClass(ShakeTool,'ShakeTool');
