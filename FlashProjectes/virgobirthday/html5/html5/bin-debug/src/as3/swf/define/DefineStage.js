var egret;
(function (egret) {
    var DefineStage = (function (_super) {
        __extends(DefineStage, _super);
        function DefineStage(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this);
            this.createFromObject(obj);
            this.t = egret.Config.RESStage;
        }
        var __egretProto__ = DefineStage.prototype;
        return DefineStage;
    })(egret.DefineSprite);
    egret.DefineStage = DefineStage;
    DefineStage.prototype.__class__ = "egret.DefineStage";
})(egret || (egret = {}));
