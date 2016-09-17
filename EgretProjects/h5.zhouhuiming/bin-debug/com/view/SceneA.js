/**
 * 场景A
 * @author
 *
 */
var SceneA = (function (_super) {
    __extends(SceneA, _super);
    function SceneA() {
        _super.call(this);
        this.skinName = "SceneASkin";
    }
    var d = __define,c=SceneA,p=c.prototype;
    p.onCreated = function () {
    };
    p.onEnable = function () {
        App.sndMgr.play(App.sndMgr.phone, Number.MAX_VALUE);
        this.playPhoneAnim();
        this.phoneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    p.onRemove = function () {
    };
    p.onTouch = function () {
        this.nextScene();
    };
    //按钮晃动
    p.playPhoneAnim = function () {
        this.phoneBtn.rotation = 0;
        egret.Tween.get(this.phoneBtn, { loop: true }).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).
            to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).
            to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).wait(1500);
    };
    p.nextScene = function () {
        App.sndMgr.stop();
        egret.Tween.removeTweens(this.phoneBtn);
        this.phoneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        App.layerMgr.runScene(App.sceneMgr.sceneB);
    };
    return SceneA;
}(BaseScene));
egret.registerClass(SceneA,'SceneA');
