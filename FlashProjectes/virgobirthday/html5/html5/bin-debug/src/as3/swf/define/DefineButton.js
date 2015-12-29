/**
 * Created by chenpeng on 2015/6/2.
 */
var egret;
(function (egret) {
    var DefineButton = (function (_super) {
        __extends(DefineButton, _super);
        function DefineButton(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this, obj);
            this.t = egret.Config.RESButton;
        }
        var __egretProto__ = DefineButton.prototype;
        return DefineButton;
    })(egret.DefineBase);
    egret.DefineButton = DefineButton;
    DefineButton.prototype.__class__ = "egret.DefineButton";
})(egret || (egret = {}));
