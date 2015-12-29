/**
*  文 件 名：EnterGamePanel.ts
*  功    能   : 进入游戏面板
*  内    容： 进入游戏前，选择道具等
*  作    者： Rikimaru
*  生成日期：2015/8/23
*  修改日期：2015/8/23
*  修改日志：
*/
var EnterGamePanel = (function (_super) {
    __extends(EnterGamePanel, _super);
    function EnterGamePanel() {
        _super.call(this);
        this.skinName = skins.ui.EnterGamePanelSkin;
    }
    var __egretProto__ = EnterGamePanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.onEnable();
    };
    __egretProto__.onEnable = function () {
        this.x = LayerManager.getInstance().uiStage.width / 2 - this.width / 2;
        this.y = LayerManager.getInstance().uiStage.height / 2 - this.height / 2;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    __egretProto__.onRemove = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    __egretProto__.onTouchTap = function (e) {
        switch (e.target) {
            case this.startBtn:
                var layerManager = LayerManager.getInstance();
                layerManager.showLoading();
                var self = this;
                LoadManager.getInstance().loadGroup(GameConfig.GN_Game, this, function () {
                    layerManager.uiPopLayer.removeElement(self);
                    layerManager.hideLoading();
                    layerManager.replaceScene(GameConfig.SN_Game, 1 /* R */);
                });
                break;
            case this.closeBtn:
                LayerManager.getInstance().uiPopLayer.removeElement(this);
                break;
        }
    };
    return EnterGamePanel;
})(egret.gui.SkinnableComponent);
EnterGamePanel.prototype.__class__ = "EnterGamePanel";
