var egret;
(function (egret) {
    var DefineImage = (function (_super) {
        __extends(DefineImage, _super);
        function DefineImage(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this);
            this.w = 0;
            this.h = 0;
            this.createFromObject(obj);
            this.t = egret.Config.RESImage;
        }
        var __egretProto__ = DefineImage.prototype;
        return DefineImage;
    })(egret.DefineBase);
    egret.DefineImage = DefineImage;
    DefineImage.prototype.__class__ = "egret.DefineImage";
})(egret || (egret = {}));
