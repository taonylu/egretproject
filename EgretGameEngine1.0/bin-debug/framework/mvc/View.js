/**
 * 控制类
 * @author chenkai
 * @date 2017/2/8
 *
 * Example:
 * App.View.register(HomeMediator.NAME, new HomeMediator());
 */
var View = (function (_super) {
    __extends(View, _super);
    function View() {
        _super.apply(this, arguments);
        /**控制模块列表*/
        this.mediatorList = {};
    }
    var d = __define,c=View,p=c.prototype;
    /**
     * 注册控制类
     * @mediatorName 视图模块名
     * @mediator 控制模块
     */
    p.register = function (mediatorName, mediator) {
        mediator.onRegister();
        this.mediatorList[mediatorName] = mediator;
    };
    /**
     * 注销控制模块
     * @mediatorName 视图模块名
     */
    p.unRegister = function (mediatorName) {
        var controller = this.mediatorList[mediatorName];
        if (controller) {
            controller.onRemove();
            this.mediatorList[mediatorName] = null;
            delete this.mediatorList[mediatorName];
        }
    };
    /**
     * 获取控制模块
     * @mediatorName 控制模块名
     */
    p.getController = function (mediatorName) {
        return this.mediatorList[mediatorName];
    };
    return View;
}(SingleClass));
egret.registerClass(View,'View');
