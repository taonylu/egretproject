/**
 * 自定义事件
 * @author
 *
 */
var MyEvent = (function (_super) {
    __extends(MyEvent, _super);
    function MyEvent(type, data) {
        _super.call(this, type, false, false, data);
    }
    var d = __define,c=MyEvent,p=c.prototype;
    return MyEvent;
})(egret.Event);
egret.registerClass(MyEvent,'MyEvent');
