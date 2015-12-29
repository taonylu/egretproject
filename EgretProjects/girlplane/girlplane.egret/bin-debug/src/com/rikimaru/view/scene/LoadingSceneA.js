/**
*  文 件 名：LoadingSceneA.ts
*  功    能： 加载界面A
*  内    容： activity->home加载界面
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2015/8/23
*  修改日志：
*/
var LoadingSceneA = (function (_super) {
    __extends(LoadingSceneA, _super);
    function LoadingSceneA() {
        _super.call(this);
        this.skinName = skins.scene.LoadingSceneASkin;
    }
    var __egretProto__ = LoadingSceneA.prototype;
    __egretProto__.childrenCreated = function () {
        this.onEnable();
    };
    __egretProto__.onEnable = function () {
        this.loadingAnim.play();
    };
    __egretProto__.onRemove = function () {
        this.loadingAnim.stop();
    };
    return LoadingSceneA;
})(BaseScene);
LoadingSceneA.prototype.__class__ = "LoadingSceneA";
