/**
*  文 件 名：PopupBoxUI.ts
*  功    能: 弹出框，连接失败等提示框
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/24
*  修改日期：2015/9/24
*  修改日志：
*/
var PopupBoxUI = (function (_super) {
    __extends(PopupBoxUI, _super);
    function PopupBoxUI() {
        _super.call(this);
        this.skinName = skins.ui.PopupBoxUISkin;
    }
    var d = __define,c=PopupBoxUI;p=c.prototype;
    p.childrenCreated = function () {
        this.x = (GameConst.StageWidth - this.width) / 2;
        this.y = (GameConst.StageHeight - this.height) / 2;
        this.msgLabel.text = this.msgBuffer;
    };
    p.showMsg = function (msg) {
        LayerManager.getInstance().uiPopLayer.addElement(this);
        this.msgBuffer = msg;
        if (this.initialized) {
            this.msgLabel.text = msg;
        }
        var self = this;
        egret.Tween.get(this).wait(1000).call(function () {
            self.hide();
        });
    };
    p.hide = function () {
        if (this.parent) {
            LayerManager.getInstance().uiPopLayer.removeElement(this);
        }
    };
    return PopupBoxUI;
})(egret.gui.SkinnableComponent);
egret.registerClass(PopupBoxUI,"PopupBoxUI");
