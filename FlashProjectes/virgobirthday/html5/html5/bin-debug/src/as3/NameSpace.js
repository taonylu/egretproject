/**
 * Created by huitao on 2015/5/13.
 */
var flash;
(function (flash) {
    var NameSpace = (function () {
        function NameSpace(prefixValue, uriValue) {
            this.prefix = prefixValue;
            this.uri = uriValue;
        }
        var __egretProto__ = NameSpace.prototype;
        __egretProto__.toString = function () {
            return this.uri;
        };
        __egretProto__.valueOf = function () {
            return this.uri;
        };
        return NameSpace;
    })();
    flash.NameSpace = NameSpace;
    NameSpace.prototype.__class__ = "flash.NameSpace";
})(flash || (flash = {}));
