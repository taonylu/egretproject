/**
 * Created by huitao on 2015/5/13.
 */
var flash;
(function (flash) {
    var Error = (function () {
        function Error(message, id) {
            if (message === void 0) { message = ""; }
            if (id === void 0) { id = 0; }
            this.$_message = "";
            this.name = "";
            this._errorID = 0;
            this.$_message = message != undefined ? message : "";
            this._errorID = id != undefined ? id : 0;
        }
        var __egretProto__ = Error.prototype;
        Object.defineProperty(__egretProto__, "message", {
            get: function () {
                return this.$_message;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "errorId", {
            get: function () {
                return this._errorID;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.getStackTrace = function () {
            return "暂时没有提供错误调用堆栈...";
        };
        __egretProto__.toString = function () {
            return "没事有实现";
        };
        return Error;
    })();
    flash.Error = Error;
    Error.prototype.__class__ = "flash.Error";
})(flash || (flash = {}));
