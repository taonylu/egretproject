var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var BeEatenUISkin = (function (_super) {
            __extends(BeEatenUISkin, _super);
            function BeEatenUISkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [300, 500]);
                this.elementsContent = [this.__3_i(), this.titleLabel_i(), this.continueBtn_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BeEatenUISkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BeEatenUISkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.continueBtn_i = function () {
                var t = new egret.gui.Button();
                this.continueBtn = t;
                t.setStyle("textColor", 0x050000);
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [50, "继续游戏", new egret.gui.ButtonSkin("whitebg_jpg"), 156, 163, 213]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                t.setStyle("textColor", 0xD0EFD7);
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0xCBEFEB, 300, 500, 0, 0]);
                return t;
            };
            __egretProto__.titleLabel_i = function () {
                var t = new egret.gui.Label();
                this.titleLabel = t;
                this.__s(t, ["text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], ["你被xxxx吃掉了", "center", 0x030000, "middle", 410, 45, 19]);
                return t;
            };
            BeEatenUISkin._skinParts = ["titleLabel", "continueBtn"];
            return BeEatenUISkin;
        })(egret.gui.Skin);
        ui.BeEatenUISkin = BeEatenUISkin;
        BeEatenUISkin.prototype.__class__ = "skins.ui.BeEatenUISkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
