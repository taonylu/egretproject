/**
 * 场景
 * @author chenkai
 * @date 2016/12/18
 */
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        _super.call(this);
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=BaseScene,p=c.prototype;
    /**显示到舞台*/
    p.onEnable = function () {
    };
    /**从舞台移除*/
    p.onRemove = function () {
    };
    /**重置*/
    p.onReset = function () {
    };
    /**销毁*/
    p.onDestory = function () {
    };
    return BaseScene;
}(eui.Component));
egret.registerClass(BaseScene,'BaseScene',["IBaseUI"]);
//# sourceMappingURL=BaseScene.js.map