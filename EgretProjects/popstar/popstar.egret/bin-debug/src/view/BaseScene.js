/**
 *
 * @author
 *
 */
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onEnable, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
    var __egretProto__ = BaseScene.prototype;
    __egretProto__.onEnable = function () {
    };
    __egretProto__.onRemove = function () {
    };
    return BaseScene;
})(egret.gui.SkinnableComponent);
BaseScene.prototype.__class__ = "BaseScene";
