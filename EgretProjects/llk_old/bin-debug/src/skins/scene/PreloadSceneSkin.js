var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var PreloadSceneSkin = (function (_super) {
            __extends(PreloadSceneSkin, _super);
            function PreloadSceneSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [1000, 640]);
                this.elementsContent = [this.bg_i(), this.loadLabel_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PreloadSceneSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PreloadSceneSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.loadLabel_i = function () {
                var t = new egret.gui.Label();
                this.loadLabel = t;
                this.__s(t, ["horizontalCenter", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [0, 50, "加载中...12/30", "center", "middle", 0]);
                return t;
            };
            __egretProto__.bg_i = function () {
                var t = new egret.gui.Rect();
                this.bg = t;
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x5F5858, 1200, 640, 0, 0]);
                return t;
            };
            PreloadSceneSkin._skinParts = ["bg", "loadLabel"];
            return PreloadSceneSkin;
        })(egret.gui.Skin);
        scene.PreloadSceneSkin = PreloadSceneSkin;
        PreloadSceneSkin.prototype.__class__ = "skins.scene.PreloadSceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
