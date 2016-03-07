/**
*  文 件 名：LoadingPanel.ts
*  功    能   : 加载动画的窗口
*  内    容： 用于游戏全局加载动画，显示在场景前方，并使用透明背景遮挡场景的按钮
*  作    者： Rikimaru
*  生成日期：2015/8/23
*  修改日期：2015/8/23
*  修改日志：
*/
var LoadingPanel = (function (_super) {
    __extends(LoadingPanel, _super);
    function LoadingPanel() {
        _super.call(this);
        this.skinName = skins.ui.LoadingPanelSkin;
    }
    var __egretProto__ = LoadingPanel.prototype;
    __egretProto__.childrenCreated = function () {
        //透明背景
        this.bg = new egret.Sprite();
        this.bg.graphics.beginFill(0x000000, 0);
        this.bg.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeight);
        this.bg.graphics.endFill();
        this.addElement(new egret.gui.UIAsset(this.bg));
        this.onEnable();
    };
    __egretProto__.onEnable = function () {
        if (this.loadingAnim) {
            this.loadingAnim.play();
        }
    };
    __egretProto__.onRemove = function () {
        if (this.loadingAnim) {
            this.loadingAnim.stop();
        }
    };
    return LoadingPanel;
})(egret.gui.SkinnableContainer);
LoadingPanel.prototype.__class__ = "LoadingPanel";
