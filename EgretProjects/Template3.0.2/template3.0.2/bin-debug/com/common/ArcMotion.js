/**
*  文 件 名： ArcMotion.ts
*  功    能： 弧线运动
*  内    容： 利用tween和二次贝塞尔曲线实现的弧线运动
*  作    者： Rikimaru
*  生成日期： 2016/3/7
*  修改日期： 2016/3/7
*  修改日志：
*
* Example:
* this.arc = new ArcMotion(this.ball,[0,0],[100,100],[200,200],1500,true);
* this.arc.play();
* this.arc.stop();
*/
var ArcMotion = (function () {
    /**
     * 初始化
     * @param target 目标对象
     * @param p0 起始点
     * @param p1 拐点
     * @param p2 终止点
     * @param delay 运动时间 默认1000
     * @param loop 是否循环  默认false
     */
    function ArcMotion(target, p0, p1, p2, delay, loop) {
        if (delay === void 0) { delay = 1000; }
        if (loop === void 0) { loop = false; }
        this.loop = false; //是否循环
        this.delay = 1000; //运动时间
        this.target = target;
        this.p0 = new egret.Point(p0[0], p0[1]);
        this.p1 = new egret.Point(p1[0], p1[1]);
        this.p2 = new egret.Point(p2[0], p2[1]);
        this.loop = loop;
        this.delay = delay;
    }
    var d = __define,c=ArcMotion,p=c.prototype;
    /**播放*/
    p.play = function () {
        //factor由0向1渐变，会调用set factor，ball的坐标变化
        this.factor = 0;
        egret.Tween.get(this, { loop: this.loop }).to({ factor: 1 }, this.delay);
    };
    /**停止*/
    p.stop = function () {
        egret.Tween.removeTweens(this);
    };
    d(p, "factor"
        ,function () {
            return 0;
        }
        /**二次贝塞尔曲线公式*/
        ,function (value) {
            this.target.x = (1 - value) * (1 - value) * this.p0.x + 2 * value * (1 - value) * this.p1.x + value * value * this.p2.x;
            this.target.y = (1 - value) * (1 - value) * this.p0.y + 2 * value * (1 - value) * this.p1.y + value * value * this.p2.y;
        }
    );
    /**销毁*/
    p.destroy = function () {
        this.stop();
        this.target = null;
    };
    return ArcMotion;
})();
egret.registerClass(ArcMotion,'ArcMotion');
