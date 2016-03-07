var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var LosePanelSkin = (function (_super) {
            __extends(LosePanelSkin, _super);
            function LosePanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [320, 520]);
                this.elementsContent = [this.__3_i(), this.__4_i(), this.timeLabel_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = LosePanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return LosePanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 40, "游戏失败", 0xF84D09, 287, 252]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["img_bg", 8, 10]);
                return t;
            };
            __egretProto__.timeLabel_i = function () {
                var t = new egret.gui.Label();
                this.timeLabel = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 70, "3", 0x010000, 346, 134]);
                return t;
            };
            LosePanelSkin._skinParts = ["timeLabel"];
            return LosePanelSkin;
        })(egret.gui.Skin);
        ui.LosePanelSkin = LosePanelSkin;
        LosePanelSkin.prototype.__class__ = "skins.ui.LosePanelSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
