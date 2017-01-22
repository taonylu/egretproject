/**
 * App基类
 * @author chenkai
 * @date 2016/12/18
 */
var BaseApp = (function (_super) {
    __extends(BaseApp, _super);
    function BaseApp() {
        _super.apply(this, arguments);
        /**控制模块列表*/
        this.controllerList = {};
    }
    var d = __define,c=BaseApp,p=c.prototype;
    /**
     * 注册控制类
     * @controller 控制模块
     * @controllerName 控制模块名
     */
    p.registerController = function (controller, controllerName) {
        this.controllerList[controllerName] = controller;
    };
    /**
     * 注销控制模块
     * @controllerName 控制模块名
     */
    p.unRegisterController = function (controllerName) {
        this.controllerList[controllerName] = null;
        delete this.controllerList[controllerName];
    };
    /**
     * 获取控制模块
     * @controllerName 控制模块名
     */
    p.getController = function (controllerName) {
        return this.controllerList[controllerName];
    };
    /**
     * 添加消息监听
     * @param type 事件类型
     * @param listener 侦听函数
     * @param thisObject 侦听函数所属对象
     */
    p.addEvent = function (type, listener, thisObject) {
        App.EventManager.addEvent(type, listener, thisObject);
    };
    /**
     * 移除消息监听
     * @param type 事件类型
     * @param listener 侦听函数
     * @param thisObject 侦听函数所属对象
     */
    p.removeEvent = function (type, listener, thisObject) {
        App.EventManager.removeEvent(type, listener, thisObject);
    };
    /**
     * 发送事件
     * @param type 事件类型
     * @param param 消息参数
     *
     */
    p.sendEvent = function (type) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        (_a = App.EventManager).sendEvent.apply(_a, [type].concat(param));
        var _a;
    };
    return BaseApp;
}(SingleClass));
egret.registerClass(BaseApp,'BaseApp');
