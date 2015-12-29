var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var LoadSceneSkin = (function (_super) {
            __extends(LoadSceneSkin, _super);
            function LoadSceneSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 850]);
                this.elementsContent = [this.__3_i(), this.contentGroup_i()];
                this.states = [
                    new egret.gui.State("normal", [
                    ]),
                    new egret.gui.State("disabled", [
                    ])
                ];
            }
            var d = __define,c=LoadSceneSkin;p=c.prototype;
            d(p, "skinParts"
                ,function () {
                    return LoadSceneSkin._skinParts;
                }
            );
            p.contentGroup_i = function () {
                var t = new egret.gui.Group();
                this.contentGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [200, 200, 0, 0]);
                return t;
            };
            p.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "homebg_png", 850, 0, 0]);
                return t;
            };
            LoadSceneSkin._skinParts = ["contentGroup"];
            return LoadSceneSkin;
        })(egret.gui.Skin);
        scene.LoadSceneSkin = LoadSceneSkin;
        egret.registerClass(LoadSceneSkin,"skins.scene.LoadSceneSkin");
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
