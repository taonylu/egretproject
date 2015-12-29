var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var HomeSceneSkin = (function (_super) {
            __extends(HomeSceneSkin, _super);
            function HomeSceneSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [800, 480]);
                this.elementsContent = [this.__3_i(), this.newBtn_i(), this.continueBtn_i(), this.shopBtn_i()];
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
            __egretProto__.continueBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.continueBtn = t;
                this.__s(t, ["source", "x", "y"], ["menu_continue_png", 106, 412.5]);
                return t;
            };
            __egretProto__.newBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.newBtn = t;
                this.__s(t, ["source", "x", "y"], ["menu_start_png", 106, 316]);
                return t;
            };
            __egretProto__.shopBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.shopBtn = t;
                this.__s(t, ["source", "x", "y"], ["menu_shop_png", 106, 509]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "bg_menuscene_jpg";
                return t;
            };
            HomeSceneSkin._skinParts = ["newBtn", "continueBtn", "shopBtn"];
            return HomeSceneSkin;
        })(egret.gui.Skin);
        scene.HomeSceneSkin = HomeSceneSkin;
        HomeSceneSkin.prototype.__class__ = "skins.scene.HomeSceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
