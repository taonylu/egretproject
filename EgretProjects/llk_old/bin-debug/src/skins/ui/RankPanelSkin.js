var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var RankPanelSkin = (function (_super) {
            __extends(RankPanelSkin, _super);
            function RankPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [1200, 640]);
                this.elementsContent = [this.bg_i(), this.__6_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = RankPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return RankPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 40, "3", 0x090000, 144, 520]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 40, "2", 0x090000, 144, 465]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "left", "right", "top"], [0, 0, 0, 0]);
                t.elementsContent = [this.panelBg_i(), this.__3_i(), this.__4_i(), this.__5_i(), this.name1Label_i(), this.score1Label_i(), this.score2Label_i(), this.score3Label_i(), this.name2Label_i(), this.name3Label_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.bg_i = function () {
                var t = new egret.gui.Rect();
                this.bg = t;
                this.__s(t, ["fillAlpha", "height", "width", "x", "y"], [0, 1200, 640, 0, 0]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.closeBtn = t;
                this.__s(t, ["source", "x", "y"], ["close", 480, 300]);
                return t;
            };
            __egretProto__.name1Label_i = function () {
                var t = new egret.gui.Label();
                this.name1Label = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["Arial", 40, "aaaa", 0x090000, 209, 204, 411]);
                return t;
            };
            __egretProto__.name2Label_i = function () {
                var t = new egret.gui.Label();
                this.name2Label = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["Arial", 40, "1", 0x090000, 212, 204, 466]);
                return t;
            };
            __egretProto__.name3Label_i = function () {
                var t = new egret.gui.Label();
                this.name3Label = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["Arial", 40, "1", 0x090000, 220, 204, 520]);
                return t;
            };
            __egretProto__.panelBg_i = function () {
                var t = new egret.gui.Rect();
                this.panelBg = t;
                this.__s(t, ["height", "width", "x", "y"], [300, 400, 133, 286]);
                return t;
            };
            __egretProto__.score1Label_i = function () {
                var t = new egret.gui.Label();
                this.score1Label = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["Arial", 40, "999", 0x090000, 74, 442, 411]);
                return t;
            };
            __egretProto__.score2Label_i = function () {
                var t = new egret.gui.Label();
                this.score2Label = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["Arial", 40, "999", 0x090000, 74, 442, 464]);
                return t;
            };
            __egretProto__.score3Label_i = function () {
                var t = new egret.gui.Label();
                this.score3Label = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["Arial", 40, "999", 0x090000, 74, 442, 517]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 40, "1", 0x090000, 144, 409]);
                return t;
            };
            RankPanelSkin._skinParts = ["bg", "panelBg", "name1Label", "score1Label", "score2Label", "score3Label", "name2Label", "name3Label", "closeBtn"];
            return RankPanelSkin;
        })(egret.gui.Skin);
        ui.RankPanelSkin = RankPanelSkin;
        RankPanelSkin.prototype.__class__ = "skins.ui.RankPanelSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
