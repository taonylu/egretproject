var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var FenLieSkin = (function (_super) {
            __extends(FenLieSkin, _super);
            function FenLieSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [100, 100]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = FenLieSkin.prototype;
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "fenlie_png";
                return t;
            };
            return FenLieSkin;
        })(egret.gui.Skin);
        ui.FenLieSkin = FenLieSkin;
        FenLieSkin.prototype.__class__ = "skins.ui.FenLieSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
