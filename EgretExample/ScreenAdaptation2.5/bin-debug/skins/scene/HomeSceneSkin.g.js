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
                this.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i()];
                this.states = [
                    new egret.gui.State("normal", [
                    ]),
                    new egret.gui.State("disabled", [
                    ])
                ];
            }
            var d = __define,c=HomeSceneSkin;p=c.prototype;
            p.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "bg_jpg";
                return t;
            };
            p.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["left", "source", "top"], [0, "btn_png", 0]);
                return t;
            };
            p.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["right", "source"], [0, "btn_png"]);
                return t;
            };
            p.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "btn_png", 0]);
                return t;
            };
            p.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "left", "source"], [0, 0, "btn_png"]);
                return t;
            };
            p.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "right", "source"], [0, 0, "btn_png"]);
                return t;
            };
            return HomeSceneSkin;
        })(egret.gui.Skin);
        scene.HomeSceneSkin = HomeSceneSkin;
        egret.registerClass(HomeSceneSkin,"skins.scene.HomeSceneSkin");
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
