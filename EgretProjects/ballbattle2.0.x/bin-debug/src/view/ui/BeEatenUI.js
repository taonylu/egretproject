/**
 *  文 件 名：BeEatenUI.ts
 *  功    能：被吃掉后，显示的弹出框
 *  内    容：
 *  作    者： 羊力大仙
 *  生成日期：2015/10/10
 *  修改日期：2015/10/10
 *  修改日志：
 */
var BeEatenUI = (function (_super) {
    __extends(BeEatenUI, _super);
    function BeEatenUI() {
        _super.call(this);
        this.skinName = skins.ui.BeEatenUISkin;
    }
    var __egretProto__ = BeEatenUI.prototype;
    __egretProto__.childrenCreated = function () {
        this.titleLabel.text = "你被" + this.titleBuffer + "吃掉了";
        this.x = (GameConst.StageWidth - this.width) / 2;
        this.y = (GameConst.StageHeight - this.height) / 2;
    };
    __egretProto__.show = function () {
        LayerManager.getInstance().uiSceneLayer.addElement(this);
        this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinueBtnClick, this);
    };
    __egretProto__.setTitle = function (userName) {
        this.titleBuffer = userName;
        if (this.initialized) {
            this.titleLabel.text = "你被" + userName + "吃掉了";
        }
    };
    __egretProto__.onContinueBtnClick = function () {
        LayerManager.getInstance().uiSceneLayer.removeElement(this);
        ApplicationFacade.getInstance().sendNotification(GameMediator.QUIT_GAME);
    };
    return BeEatenUI;
})(egret.gui.SkinnableComponent);
BeEatenUI.prototype.__class__ = "BeEatenUI";
