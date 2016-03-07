/**
*  文 件 名：LoadAnimUI.ts
*  功    能   : 财产面板
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2015/8/22
*  修改日志：
*/
var LoadingAnim = (function (_super) {
    __extends(LoadingAnim, _super);
    function LoadingAnim() {
        _super.call(this);
        this.skinName = skins.ui.LoadingAnimSkin;
    }
    var __egretProto__ = LoadingAnim.prototype;
    __egretProto__.childrenCreated = function () {
        this.circle.anchorOffsetX = this.circle.width / 2;
        this.circle.anchorOffsetY = this.circle.height / 2;
        this.circle.x += this.circle.width / 2;
        this.circle.y += this.circle.height / 2;
    };
    __egretProto__.play = function () {
        egret.Tween.get(this.circle, { loop: true }).to({ rotation: 360 }, 1000);
    };
    __egretProto__.stop = function () {
        egret.Tween.removeTweens(this.circle);
    };
    /**正常*/
    LoadingAnim.Type_Normal = "normal";
    /**旋转*/
    LoadingAnim.Type_Rotate = "rotate";
    return LoadingAnim;
})(egret.gui.SkinnableComponent);
LoadingAnim.prototype.__class__ = "LoadingAnim";
