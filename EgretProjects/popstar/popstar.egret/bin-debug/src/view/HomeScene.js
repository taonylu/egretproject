/**
 *
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this);
        this.skinName = skins.scene.HomeSceneSkin;
        this.touchEnabled = false;
    }
    var __egretProto__ = HomeScene.prototype;
    __egretProto__.onEnable = function () {
        this.newBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNewBtnTouch, this);
    };
    __egretProto__.onRemove = function () {
        this.newBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onNewBtnTouch, this);
    };
    __egretProto__.onNewBtnTouch = function (e) {
        App.getInstance().runScene(AppConst.SceneID_Game);
    };
    return HomeScene;
})(BaseScene);
HomeScene.prototype.__class__ = "HomeScene";
