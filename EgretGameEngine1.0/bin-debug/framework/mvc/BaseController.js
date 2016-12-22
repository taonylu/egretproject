/**
 * 控制基类
 * @author chenkai
 * @date 2016/12/18
 */
var BaseController = (function () {
    function BaseController() {
    }
    var d = __define,c=BaseController,p=c.prototype;
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
    return BaseController;
}());
egret.registerClass(BaseController,'BaseController');
//# sourceMappingURL=BaseController.js.map