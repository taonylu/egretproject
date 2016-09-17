/**
 * 场景B
 * @author
 *
 */
var SceneB = (function (_super) {
    __extends(SceneB, _super);
    function SceneB() {
        _super.call(this);
        this.phoneTimer = new egret.Timer(1000);
        this.skinName = "SceneBSkin";
    }
    var d = __define,c=SceneB,p=c.prototype;
    p.onCreated = function () {
    };
    p.onEnable = function () {
        App.sndMgr.play(App.sndMgr.say);
        this.startTimer();
        this.phoneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    p.onRemove = function () {
        App.sndMgr.stop();
        this.stopTimer();
    };
    p.onTouch = function () {
        this.nextScene();
    };
    p.startTimer = function () {
        this.timeLabel.text = "00:00";
        this.phoneTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.phoneTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this);
        this.phoneTimer.repeatCount = 8;
        this.phoneTimer.reset();
        this.phoneTimer.start();
    };
    p.onTimer = function () {
        this.timeLabel.text = "00:" + NumberTool.timeFormat(this.phoneTimer.currentCount);
    };
    p.onComplete = function () {
        this.nextScene();
    };
    p.stopTimer = function () {
        this.phoneTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.phoneTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this);
        this.phoneTimer.stop();
    };
    p.nextScene = function () {
        this.phoneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.stopTimer();
        App.sndMgr.stop();
        App.layerMgr.runScene(App.sceneMgr.sceneC);
    };
    return SceneB;
}(BaseScene));
egret.registerClass(SceneB,'SceneB');
