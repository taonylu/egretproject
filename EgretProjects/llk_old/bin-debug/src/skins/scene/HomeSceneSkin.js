var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var HomeSceneSkin = (function (_super) {
            __extends(HomeSceneSkin, _super);
            function HomeSceneSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [1000, 640]);
                this.elementsContent = [this.bg_i(), this.logo_i(), this.startBtn_i(), this.__3_i(), this.inputLabel_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HomeSceneSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return HomeSceneSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bg_i = function () {
                var t = new egret.gui.Rect();
                this.bg = t;
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0xEC9595, 1200, 640, 0, 0]);
                return t;
            };
            __egretProto__.inputLabel_i = function () {
                var t = new egret.gui.EditableText();
                this.inputLabel = t;
                this.__s(t, ["height", "size", "text", "textColor", "width", "x", "y"], [58, 50, "123", 0x090707, 333, 154, 483]);
                return t;
            };
            __egretProto__.logo_i = function () {
                var t = new egret.gui.UIAsset();
                this.logo = t;
                this.__s(t, ["source", "x", "y"], ["logo_png", 105, 254]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [70, 0, 338, 476]);
                return t;
            };
            __egretProto__.startBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.startBtn = t;
                this.__s(t, ["source", "x", "y"], ["startBtn_png", 225, 650]);
                return t;
            };
            HomeSceneSkin._skinParts = ["bg", "logo", "startBtn", "inputLabel"];
            return HomeSceneSkin;
        })(egret.gui.Skin);
        scene.HomeSceneSkin = HomeSceneSkin;
        HomeSceneSkin.prototype.__class__ = "skins.scene.HomeSceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
