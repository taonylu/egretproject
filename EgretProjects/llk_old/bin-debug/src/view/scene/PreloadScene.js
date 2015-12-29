/**
*  文 件 名：PreloadScene.ts
*  功    能：加载界面
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/11
*  修改日志：
*/
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        _super.call(this);
        this.skinName = skins.scene.PreloadSceneSkin;
    }
    var __egretProto__ = PreloadScene.prototype;
    __egretProto__.setLoadLabel = function (str) {
        this.loadLabel.text = str;
    };
    return PreloadScene;
})(BaseScene);
PreloadScene.prototype.__class__ = "PreloadScene";
