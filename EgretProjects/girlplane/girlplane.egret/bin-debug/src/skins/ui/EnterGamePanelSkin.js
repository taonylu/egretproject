var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var EnterGamePanelSkin = (function (_super) {
            __extends(EnterGamePanelSkin, _super);
            function EnterGamePanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [700, 640]);
                this.elementsContent = [this.__3_i(), this.closeBtn_i(), this.startBtn_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.__13_i(), this.__14_i(), this.__15_i(), this.__16_i(), this.__17_i(), this.__18_i(), this.__19_i(), this.__20_i(), this.__21_i(), this.__22_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = EnterGamePanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EnterGamePanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["home_0001_aa_03_png", 83, 437]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["home_0001_aa_03_png", 206, 437]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["home_0001_aa_03_png", 328, 437]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["home_0001_aa_03_png", 454, 437]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["petIcon_11_png", 91, 330]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["petIcon_12_png", 216, 333]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["petIcon_13_png", 337, 329]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["petIcon_14_png", 462, 331]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["petIcon_17_png", 92, 447]);
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["petIcon_18_png", 213, 446]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["petIcon_3_png", 337, 447]);
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["petIcon_5_png", 462, 443]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["home_0000_-0_01_png", 27, 0]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "touchEnabled", "x", "y"], ["home_0000_-0_17_png", false, 373, 596]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "touchEnabled", "x", "y"], ["home_0000_-0_13_png", false, 148, 595]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["home_0000_-0_20_png", 53, 64]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["home_0001_aa_03_png", 83, 323]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["home_0001_aa_03_png", 207, 323]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["home_0001_aa_03_png", 330, 323]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.closeBtn = t;
                this.__s(t, ["source", "x", "y"], ["home_0000_-0_04_png", 89, 584]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["home_0001_aa_03_png", 454, 323]);
                return t;
            };
            __egretProto__.startBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.startBtn = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [60, "home_0000_-0_06_png", 200, 349, 585]);
                return t;
            };
            EnterGamePanelSkin._skinParts = ["closeBtn", "startBtn"];
            return EnterGamePanelSkin;
        })(egret.gui.Skin);
        ui.EnterGamePanelSkin = EnterGamePanelSkin;
        EnterGamePanelSkin.prototype.__class__ = "skins.ui.EnterGamePanelSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
