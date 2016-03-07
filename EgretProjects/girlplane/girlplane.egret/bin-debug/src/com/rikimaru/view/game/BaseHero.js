/**
*  文 件 名：BaseHero.ts
*  功    能：英雄基类
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
var BaseHero = (function (_super) {
    __extends(BaseHero, _super);
    function BaseHero() {
        _super.call(this);
    }
    var __egretProto__ = BaseHero.prototype;
    __egretProto__.onRemove = function () {
        this.parent && this.parent.removeChild(this);
    };
    return BaseHero;
})(egret.Sprite);
BaseHero.prototype.__class__ = "BaseHero";
