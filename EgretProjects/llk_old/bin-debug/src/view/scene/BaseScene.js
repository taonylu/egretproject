/**
*  文 件 名：BaseScene.ts
*  功    能： 场景基类
*  内    容： 将场景自适应到容器的100%
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        _super.call(this);
        this.percentWidth = 100;
        this.percentHeight = 100;
        this.touchEnabled = false;
    }
    var __egretProto__ = BaseScene.prototype;
    /**组建创建完毕的情况下，添加到舞台时执行*/
    __egretProto__.onEnable = function () {
    };
    /**移除界面时执行*/
    __egretProto__.onRemove = function () {
    };
    /**销毁界面时执行*/
    __egretProto__.onDestroy = function () {
    };
    return BaseScene;
})(egret.gui.SkinnableComponent);
BaseScene.prototype.__class__ = "BaseScene";
