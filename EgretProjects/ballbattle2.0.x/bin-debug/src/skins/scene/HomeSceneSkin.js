var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var HomeSceneSkin = (function (_super) {
            __extends(HomeSceneSkin, _super);
            function HomeSceneSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 850]);
                this.elementsContent = [this.__3_i(), this.__18_i()];
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
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["宋体", 18, "个人中心", 0x87B031, 0, 90]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["relative_png", 0, 0]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["宋体", 18, "关系", 0x87B031, 20, 90]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["rank_png", 0, 0]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["宋体", 18, "排行榜", 0x87B031, 10, 90]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["skin_png", 0, 0]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["宋体", 18, "皮肤", 0x87B031, 20, 90]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [404, 0, 583, 40]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.nameLabel_i(), this.centerBtn_i(), this.relationshipBtn_i(), this.rankBtn_i(), this.skinBtn_i(), this.startBtn_i(), this.randomNameBtn_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "homebg_png", 850, 0, 0]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["宋体", 25, "本轮昵称", 0x87B031, 132, 26]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["宋体", 25, "服务器", 0x87B031, 135, 106]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["height", "width", "x", "y"], [40, 250, 136, 55]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["height", "width", "x", "y"], [40, 250, 136, 136]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x14CD4E, 53, 68, 401, 199]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "height", "size", "text", "textColor", "touchEnabled", "width", "x", "y"], ["宋体", 24, 15, "团战模式", 0xFCFBFB, false, 70, 402, 232]);
                return t;
            };
            __egretProto__.centerBtn_i = function () {
                var t = new egret.gui.Group();
                this.centerBtn = t;
                this.__s(t, ["height", "width", "x", "y"], [120, 80, -2, 287]);
                t.elementsContent = [this.__10_i(), this.__11_i()];
                return t;
            };
            __egretProto__.nameLabel_i = function () {
                var t = new egret.gui.EditableText();
                this.nameLabel = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], ["宋体", 37, 25, "^_^", "left", 0x060000, "middle", 249, 136, 58]);
                return t;
            };
            __egretProto__.randomNameBtn_i = function () {
                var t = new NarrowButton();
                this.randomNameBtn = t;
                this.__s(t, ["skinName", "x", "y"], [skins.ui.RandomNameSkin, 406, 54]);
                return t;
            };
            __egretProto__.rankBtn_i = function () {
                var t = new egret.gui.Group();
                this.rankBtn = t;
                this.__s(t, ["height", "width", "x", "y"], [120, 80, 327, 287]);
                t.elementsContent = [this.__14_i(), this.__15_i()];
                return t;
            };
            __egretProto__.relationshipBtn_i = function () {
                var t = new egret.gui.Group();
                this.relationshipBtn = t;
                this.__s(t, ["height", "width", "x", "y"], [120, 80, 166, 288]);
                t.elementsContent = [this.__12_i(), this.__13_i()];
                return t;
            };
            __egretProto__.skinBtn_i = function () {
                var t = new egret.gui.Group();
                this.skinBtn = t;
                this.__s(t, ["height", "width", "x", "y"], [120, 80, 488, 286]);
                t.elementsContent = [this.__16_i(), this.__17_i()];
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["userCenter_png", 80, 0, 0]);
                return t;
            };
            __egretProto__.startBtn_i = function () {
                var t = new NarrowButton();
                this.startBtn = t;
                this.__s(t, ["skinName", "x", "y"], [skins.ui.StartBtnSkin, 133, 192]);
                return t;
            };
            HomeSceneSkin._skinParts = ["nameLabel", "centerBtn", "relationshipBtn", "rankBtn", "skinBtn", "startBtn", "randomNameBtn"];
            return HomeSceneSkin;
        })(egret.gui.Skin);
        scene.HomeSceneSkin = HomeSceneSkin;
        HomeSceneSkin.prototype.__class__ = "skins.scene.HomeSceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
