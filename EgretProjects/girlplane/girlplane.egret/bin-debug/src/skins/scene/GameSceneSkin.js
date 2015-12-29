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
                this.elementsContent = [this.gameGroup_i()];
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
                this.__s(t, ["bottom", "left", "right", "top"], [0, 0, 0, 0]);
                return t;
            };
            GameSceneSkin._skinParts = ["gameGroup"];
            return GameSceneSkin;
        })(egret.gui.Skin);
        scene.GameSceneSkin = GameSceneSkin;
        GameSceneSkin.prototype.__class__ = "skins.scene.GameSceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
