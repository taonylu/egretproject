var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var TuPaoPaoSkin = (function (_super) {
            __extends(TuPaoPaoSkin, _super);
            function TuPaoPaoSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [100, 100]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = TuPaoPaoSkin.prototype;
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "tupaopao_png";
                return t;
            };
            return TuPaoPaoSkin;
        })(egret.gui.Skin);
        ui.TuPaoPaoSkin = TuPaoPaoSkin;
        TuPaoPaoSkin.prototype.__class__ = "skins.ui.TuPaoPaoSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
