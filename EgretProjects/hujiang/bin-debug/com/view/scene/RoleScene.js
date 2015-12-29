/**
 *
 * @author
 *  人物界面
 */
var RoleScene = (function (_super) {
    __extends(RoleScene, _super);
    function RoleScene() {
        _super.call(this, "resource/myskin/scene/RoleSceneSkin.exml");
    }
    var d = __define,c=RoleScene;p=c.prototype;
    p.onEnable = function () {
        this.ringAnimFast();
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkBtnTouch, this);
        this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNoBtnTouch, this);
    };
    p.onRemove = function () {
        egret.Tween.removeAllTweens();
        this.ring1.rotation = 0;
        this.ring2.rotation = 0;
    };
    p.onOkBtnTouch = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().introduceScene);
    };
    p.onNoBtnTouch = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
    };
    p.ringAnimFast = function () {
        var self = this;
        egret.Tween.get(this.ring1).to({ rotation: this.ring1.rotation + 300 }, 1000);
        egret.Tween.get(this.ring2).to({ rotation: this.ring2.rotation + 270 }, 1000).call(function () {
            self.ringAnimSlow();
        });
    };
    p.ringAnimSlow = function () {
        var self = this;
        egret.Tween.get(this.ring1).to({ rotation: this.ring1.rotation + 320 }, 2000);
        egret.Tween.get(this.ring2).to({ rotation: this.ring2.rotation + 270 }, 2000).call(function () {
            self.ringAnimFast();
        });
    };
    return RoleScene;
})(BaseScene);
egret.registerClass(RoleScene,"RoleScene");
