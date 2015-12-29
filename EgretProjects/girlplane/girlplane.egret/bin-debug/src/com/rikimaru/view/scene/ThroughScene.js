/**
*  文 件 名：ThroughScene.ts
*  功    能   : 选关界面
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/23
*  修改日期：2015/8/23
*  修改日志：
*/
var ThroughScene = (function (_super) {
    __extends(ThroughScene, _super);
    function ThroughScene() {
        _super.call(this);
        this.skinName = skins.scene.ThroughSceneSkin;
    }
    var __egretProto__ = ThroughScene.prototype;
    __egretProto__.childrenCreated = function () {
        this.btnList = new Array();
        this.btnList.push(this.levelBtn0, this.levelBtn1, this.levelBtn2);
        for (var i = 0; i < 3; i++) {
            this.btnList[i].setLevelNum(i + 1);
        }
        this.btnList[0].setState(2 /* Cur */);
        this.uiGroup.cacheAsBitmap = true;
        this.onEnable();
    };
    __egretProto__.onEnable = function () {
        this.showLight();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    __egretProto__.onRemove = function () {
        this.hideLight();
        this.hideEnterGamePanel();
    };
    __egretProto__.onTouchTap = function (e) {
        console.log(e.target);
        switch (e.target) {
            case this.backBtn:
                LayerManager.getInstance().replaceScene(GameConfig.SN_Home, 1 /* R */);
                break;
            case this.levelBtn0:
                this.showEnterGamePanel();
                break;
        }
    };
    /**显示关卡按钮光环*/
    __egretProto__.showLight = function () {
        if (this.light == null) {
            var png = RES.getRes("a_png");
            var json = RES.getRes("a_json");
            var mcF = new egret.MovieClipDataFactory(json, png);
            var mc = new egret.MovieClip(mcF.generateMovieClipData("a"));
            mc.scaleX = 1.5;
            mc.scaleY = 1.5;
            this.light = new egret.gui.UIAsset(mc);
        }
        this.light.x = this.btnList[0].x - 50;
        this.light.y = this.btnList[0].y + 30;
        this.light.source.play(-1);
        this.lightGroup.addElement(this.light);
    };
    __egretProto__.hideLight = function () {
        if (this.light != null) {
            this.lightGroup.removeElement(this.light);
        }
    };
    /**显示进入游戏弹出框*/
    __egretProto__.showEnterGamePanel = function () {
        if (this.enterGamePanel == null) {
            this.enterGamePanel = new EnterGamePanel();
        }
        LayerManager.getInstance().uiPopLayer.addElement(this.enterGamePanel);
    };
    __egretProto__.hideEnterGamePanel = function () {
        if (this.enterGamePanel != null && this.enterGamePanel.parent) {
            LayerManager.getInstance().uiPopLayer.removeElement(this.enterGamePanel);
        }
    };
    return ThroughScene;
})(BaseScene);
ThroughScene.prototype.__class__ = "ThroughScene";
