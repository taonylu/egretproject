var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var GameSceneSkin = (function (_super) {
            __extends(GameSceneSkin, _super);
            function GameSceneSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [800, 480]);
                this.elementsContent = [this.gameBg_i(), this.targetScoreLabel_i(), this.curLevelLabel_i(), this.curScoreLabel_i(), this.nextLevelUI_i(), this.gameOverUI_i()];
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
            __egretProto__.curScoreLabel_i = function () {
                var t = new egret.gui.Label();
                this.curScoreLabel = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "text", "textColor", "y"], ["Arial", 0, "9999", 0xD84820, 146]);
                return t;
            };
            __egretProto__.gameBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.gameBg = t;
                t.source = "bg_mainscene_jpg";
                return t;
            };
            __egretProto__.gameOverUI_i = function () {
                var t = new egret.gui.UIAsset();
                this.gameOverUI = t;
                this.__s(t, ["source", "x", "y"], ["GameOver_png", 94, 271]);
                return t;
            };
            __egretProto__.nextLevelUI_i = function () {
                var t = new egret.gui.UIAsset();
                this.nextLevelUI = t;
                this.__s(t, ["source", "x", "y"], ["stage_clear_png", 104, 301]);
                return t;
            };
            __egretProto__.curLevelLabel_i = function () {
                var t = new egret.gui.Label();
                this.curLevelLabel = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 25, "关卡:1", "center", "middle", 31, 91]);
                return t;
            };
            __egretProto__.targetScoreLabel_i = function () {
                var t = new egret.gui.Label();
                this.targetScoreLabel = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "text", "textAlign", "verticalAlign", "y"], ["Arial", 0, "目标：3000", "center", "middle", 88]);
                return t;
            };
            GameSceneSkin._skinParts = ["gameBg", "targetScoreLabel", "curLevelLabel", "curScoreLabel", "nextLevelUI", "gameOverUI"];
            return GameSceneSkin;
        })(egret.gui.Skin);
        scene.GameSceneSkin = GameSceneSkin;
        GameSceneSkin.prototype.__class__ = "skins.scene.GameSceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
