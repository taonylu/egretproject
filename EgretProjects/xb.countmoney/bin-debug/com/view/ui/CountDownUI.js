/**
 *
 * @author
 *
 */
var CountDownUI = (function (_super) {
    __extends(CountDownUI, _super);
    function CountDownUI() {
        _super.call(this, "CountDownUISkin");
    }
    var d = __define,c=CountDownUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.num2.visible = false;
        this.num1.visible = false;
        this.timer = new egret.Timer(800, 3);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this);
    };
    p.show = function () {
        LayerManager.getInstance().popLayer.addChild(this);
        this.num3.visible = true;
        this.num2.visible = false;
        this.num1.visible = false;
        this.timer.reset();
        this.timer.start();
    };
    p.onTimerHandler = function () {
        if (this.timer.currentCount == 1) {
            this.num3.visible = false;
            this.num2.visible = true;
        }
        else if (this.timer.currentCount == 2) {
            this.num2.visible = false;
            this.num1.visible = true;
        }
    };
    p.onComplete = function () {
        this.parent && this.parent.removeChild(this);
        this.timer.stop();
        this.dispatchEvent(new egret.Event("countComplete"));
    };
    return CountDownUI;
})(BaseUI);
egret.registerClass(CountDownUI,'CountDownUI');
