var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var SubmitPanelSkin = (function (_super) {
            __extends(SubmitPanelSkin, _super);
            function SubmitPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [1200, 640]);
                this.elementsContent = [this.__3_i(), this.__6_i(), this.scoreLabel_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = SubmitPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return SubmitPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x7F9DEF, 300, 400, 0, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0xF3F3F7, 60, 200, 90, 177]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [59, 200, 130, 358]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.submitBtn_i()];
                return t;
            };
            __egretProto__.scoreLabel_i = function () {
                var t = new egret.gui.Label();
                this.scoreLabel = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], ["Arial", 50, "总得分：123", "center", 0x0C0A0A, "middle", 381, 135, 423]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "height", "width", "x", "y"], [0, 1200, 640, 0, 0]);
                return t;
            };
            __egretProto__.submitBtn_i = function () {
                var t = new egret.gui.Label();
                this.submitBtn = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "touchChildren", "touchEnabled", "x", "y"], ["Arial", 40, "提交分数", 0x020000, true, true, 114, 182]);
                return t;
            };
            SubmitPanelSkin._skinParts = ["submitBtn", "scoreLabel"];
            return SubmitPanelSkin;
        })(egret.gui.Skin);
        ui.SubmitPanelSkin = SubmitPanelSkin;
        SubmitPanelSkin.prototype.__class__ = "skins.ui.SubmitPanelSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
