/**
 * 事件管理类
 * egret.Event传递参数只有一个data，回调函数接收参数形式(data)
 * EventManager可传递多个参数，回调函数接收参数形式为(a,b,c)，减少了多个参数时的封装和获取步骤
 * @author chenkai
 * @date 2016/12/18
 */
var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        _super.apply(this, arguments);
        /**事件列表*/
        this.eventList = {};
    }
    var d = __define,c=EventManager,p=c.prototype;
    /**
     * 添加消息监听
     * @param type 事件类型
     * @param listener 侦听函数
     * @param thisObject 侦听函数所属对象
     */
    p.addEvent = function (type, listener, thisObject) {
        var arr = this.eventList[type];
        if (arr == null) {
            arr = new Array();
            this.eventList[type] = arr;
        }
        //检测是否已经存在
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == thisObject) {
                return;
            }
        }
        arr.push([listener, thisObject]);
    };
    /**
     * 移除消息监听
     * @param type 事件类型
     * @param listener 侦听函数
     * @param thisObject 侦听函数所属对象
     */
    p.removeEvent = function (type, listener, thisObject) {
        var arr = this.eventList[type];
        if (arr == null) {
            return;
        }
        console.log(arr);
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == thisObject) {
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length == 0) {
            this.eventList[type] = null;
            delete this.eventList[type];
        }
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
        var arr = this.eventList[type];
        if (arr == null) {
            return;
        }
        var len = arr.length;
        var listener;
        for (var i = 0; i < len; i++) {
            listener = arr[i];
            listener[0].apply(listener[1], param);
        }
    };
    return EventManager;
}(SingleClass));
egret.registerClass(EventManager,'EventManager');
