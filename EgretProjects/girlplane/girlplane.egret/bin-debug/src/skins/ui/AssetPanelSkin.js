var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var AssetPanelSkin = (function (_super) {
            __extends(AssetPanelSkin, _super);
            function AssetPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [200, 640]);
                this.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = AssetPanelSkin.prototype;
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["img_tiliS", 24, 115]);
                return t;
            };
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Button();
                this.__s(t, ["height", "skinName", "width", "x", "y"], [56, new egret.gui.ButtonSkin("img_plusBtn", "img_plusBtn2"), 56, 140, 119]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["img_numberbg", 40, 19]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["img_numberbg", 350, 19]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Button();
                this.__s(t, ["height", "skinName", "width", "x", "y"], [56, new egret.gui.ButtonSkin("img_plusBtn", "img_plusBtn2"), 56, 229, 7]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Button();
                this.__s(t, ["height", "skinName", "width", "x", "y"], [56, new egret.gui.ButtonSkin("img_plusBtn", "img_plusBtn2"), 56, 535, 10]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["img_numberbgshort", 31, 128]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["img_zsdh29", 334, 17]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["img_jinbi1", 20, 7]);
                return t;
            };
            return AssetPanelSkin;
        })(egret.gui.Skin);
        ui.AssetPanelSkin = AssetPanelSkin;
        AssetPanelSkin.prototype.__class__ = "skins.ui.AssetPanelSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
