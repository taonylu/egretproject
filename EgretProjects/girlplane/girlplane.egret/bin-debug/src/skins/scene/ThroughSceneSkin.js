var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var ThroughSceneSkin = (function (_super) {
            __extends(ThroughSceneSkin, _super);
            function ThroughSceneSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [1000, 640]);
                this.elementsContent = [this.bgGroup_i(), this.lightGroup_i(), this.uiGroup_i(), this.__6_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ThroughSceneSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ThroughSceneSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "source", "touchEnabled", "x"], [43, "home_0001_a_03_png", false, 74]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "source", "x"], [31, "home_a_03_png", 504]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new AssetPanel();
                t.skinName = skins.ui.AssetPanelSkin;
                return t;
            };
            __egretProto__.backBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.backBtn = t;
                this.__s(t, ["bottom", "height", "source", "width", "x"], [33, 64, "home_0000_-0_06_png", 94, 51]);
                return t;
            };
            __egretProto__.bgGroup_i = function () {
                var t = new egret.gui.Group();
                this.bgGroup = t;
                this.__s(t, ["bottom", "left", "right", "top"], [0, 0, 0, 0]);
                t.elementsContent = [this.__3_i()];
                return t;
            };
            __egretProto__.levelBtn0_i = function () {
                var t = new LevelBtnUI();
                this.levelBtn0 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [200, skins.ui.LevelBtnSkin, 200, 76, 718]);
                return t;
            };
            __egretProto__.levelBtn1_i = function () {
                var t = new LevelBtnUI();
                this.levelBtn1 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [200, skins.ui.LevelBtnSkin, 200, 206, 431]);
                return t;
            };
            __egretProto__.levelBtn2_i = function () {
                var t = new LevelBtnUI();
                this.levelBtn2 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [200, skins.ui.LevelBtnSkin, 200, 375, 132]);
                return t;
            };
            __egretProto__.lightGroup_i = function () {
                var t = new egret.gui.Group();
                this.lightGroup = t;
                this.__s(t, ["bottom", "left", "right", "top"], [0, 0, 0, 0]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "bgX_jpg";
                return t;
            };
            __egretProto__.uiGroup_i = function () {
                var t = new egret.gui.Group();
                this.uiGroup = t;
                this.__s(t, ["bottom", "left", "right", "top"], [0, 0, 0, 0]);
                t.elementsContent = [this.levelBtn0_i(), this.levelBtn1_i(), this.levelBtn2_i(), this.backBtn_i(), this.__4_i(), this.__5_i()];
                return t;
            };
            ThroughSceneSkin._skinParts = ["bgGroup", "lightGroup", "levelBtn0", "levelBtn1", "levelBtn2", "backBtn", "uiGroup"];
            return ThroughSceneSkin;
        })(egret.gui.Skin);
        scene.ThroughSceneSkin = ThroughSceneSkin;
        ThroughSceneSkin.prototype.__class__ = "skins.scene.ThroughSceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
