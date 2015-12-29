var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var LoadingPanelSkin = (function (_super) {
            __extends(LoadingPanelSkin, _super);
            function LoadingPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [1000, 640]);
                this.elementsContent = [this.loadingAnim_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = LoadingPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return LoadingPanelSkin._skinParts;
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
            LoadingPanelSkin._skinParts = ["loadingAnim"];
            return LoadingPanelSkin;
        })(egret.gui.Skin);
        ui.LoadingPanelSkin = LoadingPanelSkin;
        LoadingPanelSkin.prototype.__class__ = "skins.ui.LoadingPanelSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
