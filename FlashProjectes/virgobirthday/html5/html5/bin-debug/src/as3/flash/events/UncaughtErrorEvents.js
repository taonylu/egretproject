/**
 * Created by huitao on 2015/6/30.
 */
var flash;
(function (flash) {
    var UncaughtErrorEvents = (function (_super) {
        __extends(UncaughtErrorEvents, _super);
        function UncaughtErrorEvents() {
            _super.call(this);
        }
        var __egretProto__ = UncaughtErrorEvents.prototype;
        UncaughtErrorEvents.UNCAUGHT_ERROR = "uncaughtError";
        return UncaughtErrorEvents;
    })(flash.EventDispatcher);
    flash.UncaughtErrorEvents = UncaughtErrorEvents;
    UncaughtErrorEvents.prototype.__class__ = "flash.UncaughtErrorEvents";
})(flash || (flash = {}));
