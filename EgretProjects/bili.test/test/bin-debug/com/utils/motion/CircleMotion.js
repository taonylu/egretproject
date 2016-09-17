/**
*  文 件 名： CircleMotion.ts
*  功    能： 圆形运动
*  内    容：
*  作    者： Rikimaru
*  生成日期： 2016/3/7
*  修改日期： 2016/3/7
*  修改日志：
*
* Example:
* this.circleMotion = new circleMotion(this.ball,[100,100],1000/60);
* this.circleMotion.play();
* this.circleMotion.stop();
*/
var CircleMotion = (function () {
    /**
     * 构造函数
     * @param target 目标对象
     * @param centerPos 中心点数组[]
     * @param delay 计时器延迟
     */
    function CircleMotion(target, centerPos, delay) {
        if (delay === void 0) { delay = 1000 / 60; }
        this.vr = .05; //运动角度
        this.target = target;
        this.cos = Math.cos(this.vr);
        this.sin = Math.sin(this.vr);
        this.centerX = centerPos[0];
        this.centerY = centerPos[1];
        this.timer = new egret.Timer(delay);
    }
    var d = __define,c=CircleMotion,p=c.prototype;
    p.play = function () {
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.reset();
        this.timer.start();
    };
    p.stop = function () {
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
    };
    p.onTimerHandler = function () {
        var x1 = this.target.x - this.centerX;
        var y1 = this.target.y - this.centerY;
        var x2 = this.cos * x1 - this.sin * y1;
        var y2 = this.cos * y1 + this.sin * x1;
        this.target.x = this.centerX + x2;
        this.target.y = this.centerY + y2;
    };
    p.destroy = function () {
    };
    return CircleMotion;
}());
egret.registerClass(CircleMotion,'CircleMotion');
