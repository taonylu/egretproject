var egret;
(function (egret) {
    var DefineFont = (function (_super) {
        __extends(DefineFont, _super);
        function DefineFont(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this);
            // [75:DefineFont3] ID: 16, FontName: Times New Roman Bold, Italic: false, Bold: true, Glyphs: 0
            /**
             *  FontName
             */
            this.fn = "";
            /**
             *  Italic
             */
            this.fi = false;
            /**
             *  Bold
             */
            this.fb = false;
            this.createFromObject(obj);
            this.t = egret.Config.RESFont;
        }
        var __egretProto__ = DefineFont.prototype;
        return DefineFont;
    })(egret.DefineBase);
    egret.DefineFont = DefineFont;
    DefineFont.prototype.__class__ = "egret.DefineFont";
})(egret || (egret = {}));
