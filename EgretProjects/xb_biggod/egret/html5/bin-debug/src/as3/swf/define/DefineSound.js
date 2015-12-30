/**
 * Created by chenpeng on 2015/6/11.
 */
var egret;
(function (egret) {
    var DefineSound = (function (_super) {
        __extends(DefineSound, _super);
        function DefineSound(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this, obj);
            this.createFromObject(obj);
        }
        var __egretProto__ = DefineSound.prototype;
        __egretProto__.createFromObject = function (obj) {
            _super.prototype.createFromObject.call(this, obj);
            if (null == obj) {
                return;
            }
            if (obj instanceof Array) {
            }
        };
        return DefineSound;
    })(egret.DefineBase);
    egret.DefineSound = DefineSound;
    DefineSound.prototype.__class__ = "egret.DefineSound";
})(egret || (egret = {}));
