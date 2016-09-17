/**
* 场景基类
*/
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        _super.call(this);
        this.isAnimDone = false;
        this.addEventListener(eui.UIEvent.COMPLETE, this.onCreated, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onEnable, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
    var d = __define,c=BaseScene,p=c.prototype;
    p.onCreated = function () {
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    p.onDestroy = function () {
    };
    return BaseScene;
}(eui.Component));
egret.registerClass(BaseScene,'BaseScene');
