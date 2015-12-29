/**
*  文 件 名：HomeScene.ts
*  功    能：主页场景
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this);
        this.loadingUI = new LoadingUI();
        this.skinName = skins.scene.HomeSceneSkin;
    }
    var __egretProto__ = HomeScene.prototype;
    __egretProto__.childrenCreated = function () {
        this.onEnable();
    };
    __egretProto__.onEnable = function () {
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
        this.randomNameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRandomNameBtnTouch, this);
        this.playSceneAimation();
    };
    __egretProto__.onRemove = function () {
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
        this.randomNameBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRandomNameBtnTouch, this);
        this.loadingUI.hide();
    };
    __egretProto__.onStartBtnTouch = function () {
        this.loadingUI.show();
        ApplicationFacade.getInstance().sendNotification(HomeMediator.SEND_START_REQUEST);
    };
    __egretProto__.onRandomNameBtnTouch = function (e) {
        this.nameLabel.text = NameFactory.getInstance().getOne();
    };
    __egretProto__.playSceneAimation = function () {
        var startY = this.centerBtn.y + 200;
        var endY = this.centerBtn.y;
        this.centerBtn.y = startY;
        this.relationshipBtn.y = startY;
        this.rankBtn.y = startY;
        this.skinBtn.y = startY;
        egret.Tween.get(this.centerBtn).to({ y: endY }, 500, egret.Ease.circOut);
        egret.Tween.get(this.relationshipBtn).wait(200).to({ y: endY }, 500, egret.Ease.circOut);
        egret.Tween.get(this.rankBtn).wait(400).to({ y: endY }, 500, egret.Ease.circOut);
        egret.Tween.get(this.skinBtn).wait(600).to({ y: endY }, 500, egret.Ease.circOut);
    };
    return HomeScene;
})(BaseScene);
HomeScene.prototype.__class__ = "HomeScene";
