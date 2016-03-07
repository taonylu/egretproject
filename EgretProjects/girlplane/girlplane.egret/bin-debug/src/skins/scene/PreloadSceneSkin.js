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
                this.elementsContent = [this.__3_i(), this.startBtn_i(), this.loadBg_i(), this.loadLabel_i(), this.infoBtn_i(), this.__4_i(), this.infoWindow_i()];
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
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "horizontalCenter", "source"], [82, 0, "egretEngineLogo_png"]);
                return t;
            };
            __egretProto__.infoBtn_i = function () {
                var t = new egret.gui.Button();
                this.infoBtn = t;
                this.__s(t, ["bottom", "height", "skinName", "width", "x"], [39, 65, new egret.gui.ButtonSkin("img_icon_up", "img_icon_down"), 65, 552]);
                return t;
            };
            __egretProto__.infoWindow_i = function () {
                var t = new TileWindow();
                this.infoWindow = t;
                this.__s(t, ["bottom", "skinName", "top", "x"], [340, skins.ui.ProductInfoSkin, 318, 105]);
                return t;
            };
            __egretProto__.loadBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.loadBg = t;
                this.__s(t, ["bottom", "source", "x"], [140, "img_loadingbg", 104]);
                return t;
            };
            __egretProto__.loadLabel_i = function () {
                var t = new egret.gui.Label();
                this.loadLabel = t;
                this.__s(t, ["bottom", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x"], [169, "Arial", 25, "游戏加载中...99%", "center", 0x040000, "middle", 225]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["bg03_jpg", 0, -50]);
                return t;
            };
            __egretProto__.startBtn_i = function () {
                var t = new egret.gui.Button();
                this.startBtn = t;
                this.__s(t, ["bottom", "skinName", "x"], [135, new egret.gui.ButtonSkin("img_begain1", "img_begain1"), 155]);
                return t;
            };
            PreloadSceneSkin._skinParts = ["startBtn", "loadBg", "loadLabel", "infoBtn", "infoWindow"];
            return PreloadSceneSkin;
        })(egret.gui.Skin);
        scene.PreloadSceneSkin = PreloadSceneSkin;
        PreloadSceneSkin.prototype.__class__ = "skins.scene.PreloadSceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
