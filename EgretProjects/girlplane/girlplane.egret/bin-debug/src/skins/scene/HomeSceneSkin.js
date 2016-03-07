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
                this.elementsContent = [this.blueBg_i(), this.rankGroup_i(), this.modeGroup_i(), this.switchGroup_i(), this.__13_i(), this.optionGroup_i()];
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
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["roleL_5_png", 488, 339]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["hero_png", 74, 36]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new AssetPanel();
                this.__s(t, ["skinName", "top", "x"], [skins.ui.AssetPanelSkin, 20, 18]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [82, "2_png", 82, 137, 147]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [82, "11_png", 82, 138, 246]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [80, "3_png", 80, 138, 347]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 40, "455899", 0x066AF6, 240, 181]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 40, "445820", 0x066AF6, 240, 281.5]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 40, "395485", 0x066AF6, 240, 381]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["roleL_5_png", 487, 139]);
                return t;
            };
            __egretProto__.blueBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.blueBg = t;
                this.__s(t, ["cacheAsBitmap", "height", "source", "width"], [false, 1200, "rect_png", 640]);
                return t;
            };
            __egretProto__.endlessBtn_i = function () {
                var t = new egret.gui.Button();
                this.endlessBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("img_orangeBtn_1", "img_orangeBtn_2"), 297, 15]);
                return t;
            };
            __egretProto__.endlessLabel_i = function () {
                var t = new egret.gui.UIAsset();
                this.endlessLabel = t;
                this.__s(t, ["source", "touchEnabled", "x", "y"], ["img_Endless_mode", false, 343, 35]);
                return t;
            };
            __egretProto__.face1Bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.face1Bg = t;
                this.__s(t, ["source", "x", "y"], ["img_rankHead_Bg", 139, 151]);
                return t;
            };
            __egretProto__.face1Bord_i = function () {
                var t = new egret.gui.UIAsset();
                this.face1Bord = t;
                this.__s(t, ["source", "x", "y"], ["img_rankHead_Kuang", 133, 143]);
                return t;
            };
            __egretProto__.face2Bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.face2Bg = t;
                this.__s(t, ["source", "x", "y"], ["img_rankHead_Bg", 139, 250.5]);
                return t;
            };
            __egretProto__.face2Bord_i = function () {
                var t = new egret.gui.UIAsset();
                this.face2Bord = t;
                this.__s(t, ["source", "x", "y"], ["img_rankHead_Kuang", 134, 243]);
                return t;
            };
            __egretProto__.face3Bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.face3Bg = t;
                this.__s(t, ["source", "x", "y"], ["img_rankHead_Bg", 139, 350]);
                return t;
            };
            __egretProto__.face3Bord_i = function () {
                var t = new egret.gui.UIAsset();
                this.face3Bord = t;
                this.__s(t, ["source", "x", "y"], ["img_rankHead_Kuang", 134, 342]);
                return t;
            };
            __egretProto__.giftBtn_i = function () {
                var t = new egret.gui.Button();
                this.giftBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [56, new egret.gui.ButtonSkin("img_guanzhu01", "img_guanzhu02"), 68, 0, -1]);
                return t;
            };
            __egretProto__.mailBtn_i = function () {
                var t = new egret.gui.Button();
                this.mailBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("img_xinjian01", "img_xinjian02"), 230.5, -1]);
                return t;
            };
            __egretProto__.modeGroup_i = function () {
                var t = new egret.gui.Group();
                this.modeGroup = t;
                this.__s(t, ["bottom", "height", "width", "x"], [5, 131, 564, 38]);
                t.elementsContent = [this.riskBtn_i(), this.riskLabel_i(), this.endlessBtn_i(), this.endlessLabel_i()];
                return t;
            };
            __egretProto__.no1Cap_i = function () {
                var t = new egret.gui.UIAsset();
                this.no1Cap = t;
                this.__s(t, ["source", "x", "y"], ["img_54545jinguan1", 49, 142]);
                return t;
            };
            __egretProto__.no1Panel_i = function () {
                var t = new egret.gui.UIAsset();
                this.no1Panel = t;
                this.__s(t, ["source", "x", "y"], ["img_rankItemBg_1", 39, 141]);
                return t;
            };
            __egretProto__.no2Cap_i = function () {
                var t = new egret.gui.UIAsset();
                this.no2Cap = t;
                this.__s(t, ["source", "x", "y"], ["img_huangguan", 49, 240]);
                return t;
            };
            __egretProto__.no2Panel_i = function () {
                var t = new egret.gui.UIAsset();
                this.no2Panel = t;
                this.__s(t, ["source", "x", "y"], ["img_rankItemBg_1", 39, 242]);
                return t;
            };
            __egretProto__.no3Cap_i = function () {
                var t = new egret.gui.UIAsset();
                this.no3Cap = t;
                this.__s(t, ["source", "x", "y"], ["img_tongde12121", 49, 339]);
                return t;
            };
            __egretProto__.no3Panel_i = function () {
                var t = new egret.gui.UIAsset();
                this.no3Panel = t;
                this.__s(t, ["source", "x", "y"], ["img_rankItemBg_1", 39, 343]);
                return t;
            };
            __egretProto__.no4Panel_i = function () {
                var t = new egret.gui.UIAsset();
                this.no4Panel = t;
                this.__s(t, ["source", "x", "y"], ["img_rankItemBg_1", 39, 444]);
                return t;
            };
            __egretProto__.optionBtn_i = function () {
                var t = new egret.gui.Button();
                this.optionBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [54, new egret.gui.ButtonSkin("img_setBtn_01", "img_setBtn_02"), 66, 309, -1]);
                return t;
            };
            __egretProto__.optionGroup_i = function () {
                var t = new egret.gui.Group();
                this.optionGroup = t;
                this.__s(t, ["height", "top", "width", "x"], [64, 136, 412, 219]);
                t.elementsContent = [this.giftBtn_i(), this.tuiJianBtn_i(), this.taskBtn_i(), this.mailBtn_i(), this.optionBtn_i()];
                return t;
            };
            __egretProto__.rankBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.rankBg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [564, "home_frame_png", 612, 18, 26]);
                return t;
            };
            __egretProto__.rankGroup_i = function () {
                var t = new egret.gui.Group();
                this.rankGroup = t;
                this.__s(t, ["cacheAsBitmap", "height", "top", "width", "x"], [true, 616, 66, 648, -4]);
                t.elementsContent = [this.rankBg_i(), this.no1Panel_i(), this.no2Panel_i(), this.no3Panel_i(), this.no4Panel_i(), this.face1Bg_i(), this.face2Bg_i(), this.face3Bg_i(), this.__3_i(), this.__4_i(), this.__5_i(), this.face3Bord_i(), this.face2Bord_i(), this.face1Bord_i(), this.no3Cap_i(), this.no2Cap_i(), this.no1Cap_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i()];
                return t;
            };
            __egretProto__.riskBtn_i = function () {
                var t = new egret.gui.Button();
                this.riskBtn = t;
                this.__s(t, ["skinName", "width", "x", "y"], [new egret.gui.ButtonSkin("img_orangeBtn_1", "img_orangeBtn_2"), 228, 32, 14]);
                return t;
            };
            __egretProto__.riskLabel_i = function () {
                var t = new egret.gui.UIAsset();
                this.riskLabel = t;
                this.__s(t, ["source", "touchEnabled", "x", "y"], ["img_Adventure_mode", false, 66, 35]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["roleL_5_png", 488, 239]);
                return t;
            };
            __egretProto__.switchBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.switchBg = t;
                this.__s(t, ["source", "x", "y"], ["img_xuanzekuangkuang", 28, -3]);
                return t;
            };
            __egretProto__.switchBtn_i = function () {
                var t = new egret.gui.Button();
                this.switchBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("img_greenBtnBig_1", "img_greenBtnBig_2"), 391, 67]);
                return t;
            };
            __egretProto__.switchGroup_i = function () {
                var t = new egret.gui.Group();
                this.switchGroup = t;
                this.__s(t, ["height", "verticalCenter", "width", "x"], [200, 259, 638, 1]);
                t.elementsContent = [this.switchBg_i(), this.switchBtn_i(), this.switchLabel_i(), this.__12_i()];
                return t;
            };
            __egretProto__.switchLabel_i = function () {
                var t = new egret.gui.UIAsset();
                this.switchLabel = t;
                this.__s(t, ["source", "touchEnabled", "x", "y"], ["img_qiehuanfeijiTxt", false, 423, 80]);
                return t;
            };
            __egretProto__.taskBtn_i = function () {
                var t = new egret.gui.Button();
                this.taskBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [57, new egret.gui.ButtonSkin("img_renwu01", "img_renwu02"), 67, 154.5, -1]);
                return t;
            };
            __egretProto__.tuiJianBtn_i = function () {
                var t = new egret.gui.Button();
                this.tuiJianBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [56, new egret.gui.ButtonSkin("img_tuijiananniu1", "img_tuijiananniu2"), 74, 74, -1]);
                return t;
            };
            HomeSceneSkin._skinParts = ["blueBg", "rankBg", "no1Panel", "no2Panel", "no3Panel", "no4Panel", "face1Bg", "face2Bg", "face3Bg", "face3Bord", "face2Bord", "face1Bord", "no3Cap", "no2Cap", "no1Cap", "rankGroup", "riskBtn", "riskLabel", "endlessBtn", "endlessLabel", "modeGroup", "switchBg", "switchBtn", "switchLabel", "switchGroup", "giftBtn", "tuiJianBtn", "taskBtn", "mailBtn", "optionBtn", "optionGroup"];
            return HomeSceneSkin;
        })(egret.gui.Skin);
        scene.HomeSceneSkin = HomeSceneSkin;
        HomeSceneSkin.prototype.__class__ = "skins.scene.HomeSceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
