/**
*  文 件 名：HomeScene.ts
*  功    能： 游戏主场景
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2015/8/22
*  修改日志：
*/
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this);
        this.skinName = skins.scene.HomeSceneSkin;
    }
    var __egretProto__ = HomeScene.prototype;
    __egretProto__.childrenCreated = function () {
        this.onEnable();
    };
    __egretProto__.onEnable = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    __egretProto__.onRemove = function () {
    };
    __egretProto__.onTouchTap = function (e) {
        switch (e.target) {
            case this.tuiJianBtn:
                LayerManager.getInstance().replaceScene(GameConfig.SN_Activity, 1 /* R */);
                break;
            case this.riskBtn:
                var layer = LayerManager.getInstance();
                layer.showLoading();
                LoadManager.getInstance().loadGroup(GameConfig.GN_through, this, function () {
                    layer.hideLoading();
                    layer.replaceScene(GameConfig.SN_Through, 1 /* R */);
                });
                break;
        }
    };
    return HomeScene;
})(BaseScene);
HomeScene.prototype.__class__ = "HomeScene";
