/**
*  文 件 名：GameObject.ts
*  功    能：游戏元素基类
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        _super.call(this);
    }
    var __egretProto__ = GameObject.prototype;
    __egretProto__.reset = function () {
    };
    __egretProto__.onEnable = function () {
    };
    __egretProto__.onEnterFrame = function () {
    };
    __egretProto__.onRemove = function () {
        this.parent && this.parent.removeChild(this);
    };
    __egretProto__.onDestroy = function () {
    };
    return GameObject;
})(egret.Bitmap);
GameObject.prototype.__class__ = "GameObject";
