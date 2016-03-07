/**
*  文 件 名：PreloadScene.ts
*  功    能： 加载界面
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/21
*  修改日期：2015/8/21
*  修改日志：
*/
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        _super.call(this);
        this.skinName = skins.scene.PreloadSceneSkin;
    }
    var __egretProto__ = PreloadScene.prototype;
    __egretProto__.childrenCreated = function () {
        this.infoWindow.visible = false;
        this.loadBg.visible = false;
        this.loadLabel.visible = false;
        this.infoWindow.setText(GameConfig.Text_ProductInfo);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    /**点击场景*/
    __egretProto__.onTouchTap = function (e) {
        switch (e.target) {
            case this.startBtn:
                this.loadAsset();
                break;
            case this.infoBtn:
                this.infoWindow.visible = !this.infoWindow.visible;
                break;
        }
    };
    /**加载资源*/
    __egretProto__.loadAsset = function () {
        this.startBtn.visible = false;
        this.loadBg.visible = true;
        this.loadLabel.visible = true;
        this.loadLabel.text = "";
        LoadManager.getInstance().loadGroup(GameConfig.GN_Activity, this, this.onLoadComplete, this.onLoadProgress);
    };
    /**加载进度*/
    __egretProto__.onLoadProgress = function (e) {
        this.loadLabel.text = "游戏加载中..." + Math.round(e.itemsLoaded / e.itemsTotal * 100) + "%";
    };
    /**加载完成*/
    __egretProto__.onLoadComplete = function () {
        LayerManager.getInstance().replaceScene(GameConfig.SN_Activity);
    };
    return PreloadScene;
})(BaseScene);
PreloadScene.prototype.__class__ = "PreloadScene";
