/**
*  文 件 名： GestureDrag.ts
*  功    能： 手指按住拖动
*  内    容：
*  作    者： Rikimaru
*  生成日期： 2016/3/14
*  修改日期：
*  修改日志：
*
* Example:
* var ges:GestureDrag = new GestureDrag(this.bm);
* ges.start();
* ges.stop();
* ges.destroy();
*/
var GestureDrag = (function () {
    function GestureDrag(target) {
        this.target = target;
        this.start();
    }
    var d = __define,c=GestureDrag,p=c.prototype;
    p.start = function () {
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.stop = function () {
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onTouchBegin = function (e) {
        this.lastX = e.stageX;
        this.lastY = e.stageY;
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onTouchMove = function (e) {
        this.target.x += e.stageX - this.lastX;
        this.target.y += e.stageY - this.lastY;
        this.lastX = e.stageX;
        this.lastY = e.stageY;
    };
    p.onTouchEnd = function (e) {
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.destroy = function () {
        this.stop();
        this.target = null;
    };
    return GestureDrag;
})();
egret.registerClass(GestureDrag,'GestureDrag');
