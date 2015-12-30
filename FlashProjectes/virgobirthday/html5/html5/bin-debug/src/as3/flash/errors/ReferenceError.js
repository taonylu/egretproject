/**
 * Created by huitao on 2015/5/15.
 */
var flash;
(function (flash) {
    var ReferenceError = (function (_super) {
        __extends(ReferenceError, _super);
        function ReferenceError(message, id) {
            _super.call(this, message, id);
            this.name = "ReferenceError";
        }
        var __egretProto__ = ReferenceError.prototype;
        __egretProto__.toString = function () {
            return JSON.stringify(this);
        };
        return ReferenceError;
    })(flash.Error);
    flash.ReferenceError = ReferenceError;
    ReferenceError.prototype.__class__ = "flash.ReferenceError";
})(flash || (flash = {}));
