var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var GameSceneSkin = (function (_super) {
            __extends(GameSceneSkin, _super);
            function GameSceneSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 850]);
                this.elementsContent = [this.bg_i(), this.contentGroup_i(), this.weightLabel_i(), this.__14_i(), this.topLabel_i(), this.fenlieBtn_i(), this.tupaopaoBtn_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GameSceneSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GameSceneSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], ["宋体", 20, "3", "center", 0x080404, "middle", 22, 25, 128]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["宋体", 20, "4", 0xF6F0F0, 30, 164]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["宋体", 20, "5", 0xF6F0F0, 30, 198]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["cacheAsBitmap", "height", "touchChildren", "touchEnabled", "width", "x", "y"], [true, 277, false, false, 200, 649, 3]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.__13_i(), this.rank0Label_i(), this.rank1Label_i(), this.rank2Label_i(), this.rank3Label_i(), this.rank4Label_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                t.setStyle("textColor", 0xF1E5E5);
                this.__s(t, ["fillAlpha", "fillColor", "height", "width", "x", "y"], [0.2, 0x0A0909, 31, 174, 13, 5]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                t.setStyle("textColor", 0xF1E5E5);
                this.__s(t, ["fillAlpha", "fillColor", "height", "width", "x", "y"], [0.2, 0x0A0909, 193, 174, 14, 44]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "x", "y"], ["宋体", 20, "排行榜", 65, 7]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["crown_png", 14, 45]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["no2_png", 18, 85]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["no3_png", 19, 122]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], ["宋体", 20, "1", "center", 0x080404, "middle", 21, 24, 57]);
                return t;
            };
            __egretProto__.bg_i = function () {
                var t = new egret.gui.Rect();
                this.bg = t;
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x3E618A, 480, 850, 0, 0]);
                return t;
            };
            __egretProto__.contentGroup_i = function () {
                var t = new egret.gui.Group();
                this.contentGroup = t;
                this.__s(t, ["height", "width"], [20, 20]);
                return t;
            };
            __egretProto__.fenlieBtn_i = function () {
                var t = new NarrowButton();
                this.fenlieBtn = t;
                this.__s(t, ["skinName", "x", "y"], [skins.ui.FenLieSkin, 734, 370]);
                return t;
            };
            __egretProto__.rank0Label_i = function () {
                var t = new egret.gui.Label();
                this.rank0Label = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["宋体", 20, "aaaaaaa", 0xF6F0F0, 114, 65, 55]);
                return t;
            };
            __egretProto__.rank1Label_i = function () {
                var t = new egret.gui.Label();
                this.rank1Label = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["宋体", 20, "aaaaaaa", 0xF6F0F0, 114, 65, 91]);
                return t;
            };
            __egretProto__.rank2Label_i = function () {
                var t = new egret.gui.Label();
                this.rank2Label = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["宋体", 20, "aaaaaaa", 0xF6F0F0, 114, 65, 126]);
                return t;
            };
            __egretProto__.rank3Label_i = function () {
                var t = new egret.gui.Label();
                this.rank3Label = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["宋体", 20, "aaaaaaa", 0xF6F0F0, 114, 65, 162]);
                return t;
            };
            __egretProto__.rank4Label_i = function () {
                var t = new egret.gui.Label();
                this.rank4Label = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["宋体", 20, "aaaaaaa", 0xF6F0F0, 114, 65, 197]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], ["宋体", 20, "2", "center", 0x080404, "middle", 21, 25, 90]);
                return t;
            };
            __egretProto__.topLabel_i = function () {
                var t = new egret.gui.Label();
                this.topLabel = t;
                this.__s(t, ["size", "textAlign", "verticalAlign", "width", "x", "y"], [15, "center", "middle", 496, 155, 8]);
                return t;
            };
            __egretProto__.tupaopaoBtn_i = function () {
                var t = new NarrowButton();
                this.tupaopaoBtn = t;
                this.__s(t, ["skinName", "x", "y"], [skins.ui.TuPaoPaoSkin, 623, 368]);
                return t;
            };
            __egretProto__.weightLabel_i = function () {
                var t = new egret.gui.Label();
                this.weightLabel = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "touchChildren", "touchEnabled", "width", "x", "y"], ["宋体", 18, "体重：10毫克", 0xF6F0F0, false, false, 190, 7, 138]);
                return t;
            };
            GameSceneSkin._skinParts = ["bg", "contentGroup", "weightLabel", "rank0Label", "rank1Label", "rank2Label", "rank3Label", "rank4Label", "topLabel", "fenlieBtn", "tupaopaoBtn"];
            return GameSceneSkin;
        })(egret.gui.Skin);
        scene.GameSceneSkin = GameSceneSkin;
        GameSceneSkin.prototype.__class__ = "skins.scene.GameSceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
