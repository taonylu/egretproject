/**
 * Created by huitao on 2015/6/25.
 */
var flash;
(function (flash) {
    var Dictionary = (function () {
        function Dictionary(weak) {
            this.map = new Array();
        }
        var __egretProto__ = Dictionary.prototype;
        __egretProto__.getItem = function (key) {
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i][0] == key)
                    return this.map[i][1];
            }
            return undefined;
        };
        __egretProto__.setItem = function (key, val) {
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i][0] == key) {
                    this.map[i][1] = val;
                    return;
                }
            }
            this.map.push([key, val]);
            return val;
        };
        __egretProto__.delItem = function (key) {
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i][0] == key) {
                    this.map.splice(i, 1);
                    break;
                }
            }
        };
        __egretProto__.hasOwnProperty = function (key) {
            if (this.map == undefined || this.map.length == undefined) {
                return false;
            }
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i][0] == key) {
                    return true;
                }
            }
            return false;
        };
        return Dictionary;
    })();
    flash.Dictionary = Dictionary;
    Dictionary.prototype.__class__ = "flash.Dictionary";
})(flash || (flash = {}));
