/**
*  文 件 名：NarrowButton.ts
*  功    能: 点击后可以缩小的按钮
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/10/14
*  修改日期：2015/10/14
*  修改日志：
*/
var NarrowButton = (function (_super) {
    __extends(NarrowButton, _super);
    function NarrowButton() {
        _super.call(this);
        this.narrowScale = 0.9;
        this.narrowTime = 100;
        this.touchChildren = false;
        this.touchEnabled = true;
    }
    var __egretProto__ = NarrowButton.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x += this.width / 2;
        this.y += this.height / 2;
        this.configListeners();
    };
    __egretProto__.setMode = function (mode) {
        if (mode == NarrowButton.MODE_BIG) {
            this.narrowScale = 1.1;
        }
        else if (mode == NarrowButton.MODE_SMALL) {
            this.narrowScale = 0.9;
        }
    };
    __egretProto__.configListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    };
    __egretProto__.addStageListeners = function () {
        egret.gui.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    __egretProto__.removeStageListeners = function () {
        egret.gui.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    __egretProto__.touchBegin = function () {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleX: this.narrowScale, scaleY: this.narrowScale }, this.narrowTime);
        this.addStageListeners();
    };
    __egretProto__.touchEnd = function () {
        this.removeStageListeners();
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, this.narrowTime);
    };
    NarrowButton.MODE_BIG = 0;
    NarrowButton.MODE_SMALL = 1;
    return NarrowButton;
})(egret.gui.SkinnableComponent);
NarrowButton.prototype.__class__ = "NarrowButton";
