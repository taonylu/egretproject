/**
 * 事件管理类
 * egret.Event传递参数只有一个data，回调函数接收参数形式(data)
 * MessageCenter可传递多个参数，回调函数接收参数形式为(a,b,c)，减少了多个参数时的封装和获取步骤
 * @author chenkai
 * @date 2016/12/18
 *
 * Example:
 * //监听、发送事件
 * App.MessageCenter.addEvent("loginSuccess", this.loginSuccess, this);
 * App.MessageCenter.sendEvent("loginSuccess");
 *
 * //监听、发送command
 * App.MessageCenter.addCommand("Startup", StartupCommand);
 * App.MessageCenter.sendCommand("Startup");
 */
var MessageCenter = (function (_super) {
    __extends(MessageCenter, _super);
    function MessageCenter() {
        _super.apply(this, arguments);
        /**事件列表*/
        this.eventList = {};
        /**command列表*/
        this.commandList = {};
    }
    var d = __define,c=MessageCenter,p=c.prototype;
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
    /**
     * 增加command
     * @param commandName
     * @param commandClass
     */
    p.addCommand = function (commandName, commandClass) {
        this.commandList[commandName] = commandClass;
    };
    /**
     * 发送command
     * @param commandName
     * @param ..param多参数
     */
    p.sendCommand = function (commandName) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var clz = this.commandList[commandName];
        if (clz) {
            var command = new clz();
            var fun = command.execute;
            fun.apply(command, param);
        }
    };
    /**
     * 移除command
     * @param commandName
     */
    p.removeCommand = function (commandName) {
        this.commandList[commandName] = null;
        delete this.commandList[commandName];
    };
    return MessageCenter;
}(SingleClass));
egret.registerClass(MessageCenter,'MessageCenter');
