var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var LoadingSceneASkin = (function (_super) {
            __extends(LoadingSceneASkin, _super);
            function LoadingSceneASkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [1000, 640]);
                this.elementsContent = [this.bg_i(), this.loadingAnim_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = LoadingSceneASkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return LoadingSceneASkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.loadingAnim_i = function () {
                var t = new LoadingAnim();
                this.loadingAnim = t;
                this.__s(t, ["skinName", "x", "y"], [skins.ui.LoadingAnimSkin, 245, 425]);
                return t;
            };
            __egretProto__.bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg = t;
                t.source = "activityBg_jpg";
                return t;
            };
            LoadingSceneASkin._skinParts = ["bg", "loadingAnim"];
            return LoadingSceneASkin;
        })(egret.gui.Skin);
        scene.LoadingSceneASkin = LoadingSceneASkin;
        LoadingSceneASkin.prototype.__class__ = "skins.scene.LoadingSceneASkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
