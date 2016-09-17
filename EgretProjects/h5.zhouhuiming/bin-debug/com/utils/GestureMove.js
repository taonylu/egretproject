/**
 * 滑动手势
 */
var GestureMove = (function (_super) {
    __extends(GestureMove, _super);
    function GestureMove() {
        _super.call(this);
        this.dist = 50;
    }
    var d = __define,c=GestureMove,p=c.prototype;
    p.start = function () {
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.stop = function () {
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        StageUtil.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onTouchBegin = function (e) {
        this.startX = e.stageX;
        this.startY = e.stageY;
        StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onTouchEnd = function (e) {
        StageUtil.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        StageUtil.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.lastX = e.stageX;
        this.lastY = e.stageY;
        if ((this.lastY - this.startY) > this.dist) {
            this.dispatchEvent(new egret.Event(GestureMove.Down));
        }
        else if ((this.lastY - this.startY) < this.dist) {
            this.dispatchEvent(new egret.Event(GestureMove.Up));
        }
    };
    p.onTouchMove = function (e) {
        var dist = e.stageY - this.startY;
        this.startY = e.stageY;
        this.dispatchEvent(new egret.Event(GestureMove.Move));
    };
    p.destroy = function () {
        this.stop();
        this.target = null;
    };
    GestureMove.Up = "Up";
    GestureMove.Down = "Down";
    GestureMove.Move = "Move";
    return GestureMove;
}(egret.EventDispatcher));
egret.registerClass(GestureMove,'GestureMove');
