var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* 拖拽手势
* @author chenkai
* @since 2016/3/14
* @example
* var ges:GestureDrag = new GestureDrag(this.bm);
* ges.start();
* ges.stop();
* ges.destroy();
*/
var GestureDrag = (function () {
    function GestureDrag() {
        /**当前触摸ID */
        this.curPointID = -1;
    }
    /**设置拖拽对象 */
    GestureDrag.prototype.setTarget = function (target) {
        this.target = target;
    };
    /**开始拖拽 */
    GestureDrag.prototype.start = function () {
        this.curPointID = -1;
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    /**结束拖拽 */
    GestureDrag.prototype.stop = function () {
        this.curPointID = -1;
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    GestureDrag.prototype.onTouchBegin = function (e) {
        if (this.curPointID != -1) {
            return;
        }
        this.curPointID = e.touchPointID;
        this.lastX = e.stageX;
        this.lastY = e.stageY;
        App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    GestureDrag.prototype.onTouchMove = function (e) {
        if (e.touchPointID == this.curPointID) {
            this.target.x += e.stageX - this.lastX;
            this.target.y += e.stageY - this.lastY;
            this.lastX = e.stageX;
            this.lastY = e.stageY;
        }
    };
    GestureDrag.prototype.onTouchEnd = function (e) {
        if (e.touchPointID == this.curPointID) {
            this.curPointID = -1;
            App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }
    };
    /**销毁 */
    GestureDrag.prototype.destroy = function () {
        this.stop();
        this.target = null;
    };
    return GestureDrag;
}());
__reflect(GestureDrag.prototype, "GestureDrag");
//# sourceMappingURL=GestureDrag.js.map