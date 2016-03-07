/**
*  文 件 名：TileWindow.ts
*  功    能： 弹出框类
*  内    容： 自定义弹出框，1背景+1文本+1关闭按钮
*  作    者： Rikimaru
*  生成日期：2015/8/21
*  修改日期：2015/8/21
*  修改日志：
*/
var TileWindow = (function (_super) {
    __extends(TileWindow, _super);
    function TileWindow() {
        _super.apply(this, arguments);
    }
    var __egretProto__ = TileWindow.prototype;
    __egretProto__.childrenCreated = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
    };
    /**设置显示文本*/
    __egretProto__.setText = function (text) {
        this.contentLabel.text = text;
    };
    /**点击关闭按钮*/
    __egretProto__.onCloseBtnTouch = function () {
        this.visible = false;
    };
    return TileWindow;
})(egret.gui.SkinnableComponent);
TileWindow.prototype.__class__ = "TileWindow";
