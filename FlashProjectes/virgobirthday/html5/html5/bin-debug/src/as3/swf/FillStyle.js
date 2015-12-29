var egret;
(function (egret) {
    var FillStyle = (function (_super) {
        __extends(FillStyle, _super);
        function FillStyle(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this);
            this.bitmapId = 0;
            this.createFromObject(obj);
        }
        var __egretProto__ = FillStyle.prototype;
        __egretProto__.toString = function () {
            return JSON.stringify(this);
        };
        return FillStyle;
    })(egret.TransformInfo);
    egret.FillStyle = FillStyle;
    FillStyle.prototype.__class__ = "egret.FillStyle";
})(egret || (egret = {}));
