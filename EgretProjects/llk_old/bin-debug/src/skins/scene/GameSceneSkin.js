var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var GameSceneSkin = (function (_super) {
            __extends(GameSceneSkin, _super);
            function GameSceneSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [1000, 640]);
                this.elementsContent = [this.bg_i(), this.tishiBtn_i(), this.sortBtn_i(), this.gameGroup_i(), this.progressBg_i(), this.progressBar_i(), this.timeLabel_i(), this.scoreLabel_i(), this.quitBtn_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GameSceneSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GameSceneSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.gameGroup_i = function () {
                var t = new egret.gui.Group();
                this.gameGroup = t;
                this.__s(t, ["height", "left", "right", "top"], [719, 0, 0, 188]);
                return t;
            };
            __egretProto__.progressBar_i = function () {
                var t = new egret.gui.UIAsset();
                this.progressBar = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [40, "progress2", 480, 21, 46]);
                return t;
            };
            __egretProto__.progressBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.progressBg = t;
                this.__s(t, ["height", "source", "top", "width", "x"], [50, "progress1", 41, 500, 10]);
                return t;
            };
            __egretProto__.quitBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.quitBtn = t;
                this.__s(t, ["source", "x", "y"], ["close", 582, 45]);
                return t;
            };
            __egretProto__.scoreLabel_i = function () {
                var t = new egret.gui.Label();
                this.scoreLabel = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "top", "verticalAlign", "x"], ["Arial", 50, "得分：10", "center", 117, "middle", 215]);
                return t;
            };
            __egretProto__.bg_i = function () {
                var t = new egret.gui.Rect();
                this.bg = t;
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0xF08181, 1200, 640, 0, 0]);
                return t;
            };
            __egretProto__.sortBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.sortBtn = t;
                this.__s(t, ["bottom", "source", "x"], [63, "sort", 216]);
                return t;
            };
            __egretProto__.timeLabel_i = function () {
                var t = new egret.gui.Label();
                this.timeLabel = t;
                this.__s(t, ["size", "text", "top", "x"], [50, "99", 40, 517]);
                return t;
            };
            __egretProto__.tishiBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.tishiBtn = t;
                this.__s(t, ["bottom", "source", "visible", "x"], [61, "tishi", false, 97]);
                return t;
            };
            GameSceneSkin._skinParts = ["bg", "tishiBtn", "sortBtn", "gameGroup", "progressBg", "progressBar", "timeLabel", "scoreLabel", "quitBtn"];
            return GameSceneSkin;
        })(egret.gui.Skin);
        scene.GameSceneSkin = GameSceneSkin;
        GameSceneSkin.prototype.__class__ = "skins.scene.GameSceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
