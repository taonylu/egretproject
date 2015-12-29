var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var LevelBtnSkin = (function (_super) {
            __extends(LevelBtnSkin, _super);
            function LevelBtnSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [200, 200]);
                this.elementsContent = [this.levelLabel_i(), this.star3_i(), this.star2_i(), this.star1_i(), this.empty3_i(), this.empty2_i(), this.empty1_i(), this.notRead_i(), this.cur_i(), this.read_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = LevelBtnSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return LevelBtnSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.empty1_i = function () {
                var t = new egret.gui.UIAsset();
                this.empty1 = t;
                this.__s(t, ["source", "x", "y"], ["home_0001_-0_10_png", 42, 137]);
                return t;
            };
            __egretProto__.empty2_i = function () {
                var t = new egret.gui.UIAsset();
                this.empty2 = t;
                this.__s(t, ["source", "x", "y"], ["home_0001_-0_10_png", 81.5, 137]);
                return t;
            };
            __egretProto__.empty3_i = function () {
                var t = new egret.gui.UIAsset();
                this.empty3 = t;
                this.__s(t, ["source", "x", "y"], ["home_0001_-0_10_png", 120, 137]);
                return t;
            };
            __egretProto__.levelLabel_i = function () {
                var t = new egret.gui.BitmapLabel();
                this.levelLabel = t;
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["font", "horizontalCenter", "text", "y"], ["levelfnt_fnt", 0, "1", 18]);
                return t;
            };
            __egretProto__.notRead_i = function () {
                var t = new egret.gui.UIAsset();
                this.notRead = t;
                this.__s(t, ["source", "x", "y"], ["home_0001_-0_26_png", 47, 64]);
                return t;
            };
            __egretProto__.read_i = function () {
                var t = new egret.gui.UIAsset();
                this.read = t;
                this.__s(t, ["source", "x", "y"], ["home_0001_-0_39_png", 44, 65]);
                return t;
            };
            __egretProto__.cur_i = function () {
                var t = new egret.gui.UIAsset();
                this.cur = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "home_0001_-0_29_png", 0]);
                return t;
            };
            __egretProto__.star1_i = function () {
                var t = new egret.gui.UIAsset();
                this.star1 = t;
                this.__s(t, ["source", "x", "y"], ["home_0001_-0_16_png", 47, 138]);
                return t;
            };
            __egretProto__.star2_i = function () {
                var t = new egret.gui.UIAsset();
                this.star2 = t;
                this.__s(t, ["source", "x", "y"], ["home_0001_-0_16_png", 86, 138]);
                return t;
            };
            __egretProto__.star3_i = function () {
                var t = new egret.gui.UIAsset();
                this.star3 = t;
                this.__s(t, ["source", "x", "y"], ["home_0001_-0_16_png", 125, 138]);
                return t;
            };
            LevelBtnSkin._skinParts = ["levelLabel", "star3", "star2", "star1", "empty3", "empty2", "empty1", "notRead", "cur", "read"];
            return LevelBtnSkin;
        })(egret.gui.Skin);
        ui.LevelBtnSkin = LevelBtnSkin;
        LevelBtnSkin.prototype.__class__ = "skins.ui.LevelBtnSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
