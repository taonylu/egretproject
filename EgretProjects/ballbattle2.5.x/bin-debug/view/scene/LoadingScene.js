/**
*  文 件 名：LoadingScene.ts
*  功    能：主页场景
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
var LoadingScene = (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        _super.call(this);
        this.skinName = skins.scene.LoadSceneSkin;
    }
    var d = __define,c=LoadingScene;p=c.prototype;
    p.childrenCreated = function () {
        this.loadingMC = MCFactory.getOne("loading_json", "loading_png", "loading");
        this.loadingMC.x = this.width - this.loadingMC.width / 2;
        this.loadingMC.y = this.height - this.loadingMC.height;
        this.contentGroup.addElement(new egret.gui.UIAsset(this.loadingMC));
        this.onEnable();
    };
    p.onEnable = function () {
        this.loadingMC.play(-1);
    };
    p.onRemove = function () {
        this.loadingMC.stop();
    };
    return LoadingScene;
})(BaseScene);
egret.registerClass(LoadingScene,"LoadingScene");
