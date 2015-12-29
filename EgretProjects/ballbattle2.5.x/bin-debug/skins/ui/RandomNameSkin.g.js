var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var RandomNameSkin = (function (_super) {
            __extends(RandomNameSkin, _super);
            function RandomNameSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [40, 40]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", [
                    ]),
                    new egret.gui.State("disabled", [
                    ])
                ];
            }
            var d = __define,c=RandomNameSkin;p=c.prototype;
            p.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "randomName_png";
                return t;
            };
            return RandomNameSkin;
        })(egret.gui.Skin);
        ui.RandomNameSkin = RandomNameSkin;
        egret.registerClass(RandomNameSkin,"skins.ui.RandomNameSkin");
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
