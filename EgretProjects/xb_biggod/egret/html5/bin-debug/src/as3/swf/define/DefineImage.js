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
        }
        var __egretProto__ = DefineImage.prototype;
        __egretProto__.createFromObject = function (obj) {
            _super.prototype.createFromObject.call(this, obj);
            if (null == obj) {
                return;
            }
            if (obj instanceof Array) {
                this.h = obj[2];
                this.w = obj[3];
            }
        };
        return DefineImage;
    })(egret.DefineBase);
    egret.DefineImage = DefineImage;
    DefineImage.prototype.__class__ = "egret.DefineImage";
})(egret || (egret = {}));
