var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var ActivitySceneSkin = (function (_super) {
            __extends(ActivitySceneSkin, _super);
            function ActivitySceneSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["currentState", "height", "width"], ["moveArrow", 1000, 640]);
                this.transitions = [this.__13_i()];
                this.elementsContent = [this.__3_i(), this.scroll_i(), this.konwBtn_i(), this.knowPng_i(), this.radio1_i(), this.radio2_i(), this.radio3_i(), this.radio4_i(), this.circle_i(), this.leftArrow_i(), this.rightArrow_i()];
                this.states = [
                    new egret.gui.State("normal", [
                        new egret.gui.SetProperty("leftArrow", "bottom", 569),
                        new egret.gui.SetProperty("rightArrow", "bottom", 569)
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("leftArrow", "y", 333),
                        new egret.gui.SetProperty("leftArrow", "x", 11),
                        new egret.gui.SetProperty("rightArrow", "y", 333),
                        new egret.gui.SetProperty("rightArrow", "x", 586)
                    ])
                ];
            }
            var __egretProto__ = ActivitySceneSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivitySceneSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Parallel();
                this.__11 = t;
                t.target = this.leftArrow;
                t.children = [this.__10_i()];
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Parallel();
                t.children = [this.__11_i()];
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Transition();
                this.__s(t, ["fromState", "toState"], ["normal", "moveArrow"]);
                t.effect = this.__12_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "activityBg_jpg";
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["activityPic1_jpg", 72, 72]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["activityPic2_jpg", -2, 371]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["activityPic3_jpg", -111, 763]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["activityPic4_jpg", -204, 704]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width"], [756, 498]);
                t.layout = this.__8_i();
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i()];
                return t;
            };
            __egretProto__.circle_i = function () {
                var t = new egret.gui.UIAsset();
                this.circle = t;
                this.__s(t, ["source", "verticalCenter", "x"], ["img_pagepoint_yes", 323.5, 240]);
                return t;
            };
            __egretProto__.knowPng_i = function () {
                var t = new egret.gui.UIAsset();
                this.knowPng = t;
                this.__s(t, ["source", "verticalCenter", "x"], ["img_know", 408.5, 250]);
                return t;
            };
            __egretProto__.konwBtn_i = function () {
                var t = new egret.gui.Button();
                this.konwBtn = t;
                this.__s(t, ["skinName", "verticalCenter", "x"], [new egret.gui.ButtonSkin("img_vitBtn_03", "img_vitBtn_03"), 405, 211]);
                return t;
            };
            __egretProto__.leftArrow_i = function () {
                var t = new egret.gui.UIAsset();
                this.leftArrow = t;
                this.__s(t, ["source", "x", "y"], ["img_pageLeftBtn_1", 13, 330]);
                if (this.__11) {
                    this.__11.target = this.leftArrow;
                }
                return t;
            };
            __egretProto__.radio1_i = function () {
                var t = new egret.gui.UIAsset();
                this.radio1 = t;
                this.__s(t, ["source", "verticalCenter", "x"], ["img_pagepoint_no", 323.5, 239]);
                return t;
            };
            __egretProto__.radio2_i = function () {
                var t = new egret.gui.UIAsset();
                this.radio2 = t;
                this.__s(t, ["source", "verticalCenter", "x"], ["img_pagepoint_no", 323.5, 287.5]);
                return t;
            };
            __egretProto__.radio3_i = function () {
                var t = new egret.gui.UIAsset();
                this.radio3 = t;
                this.__s(t, ["source", "verticalCenter", "x"], ["img_pagepoint_no", 323.5, 335.5]);
                return t;
            };
            __egretProto__.radio4_i = function () {
                var t = new egret.gui.UIAsset();
                this.radio4 = t;
                this.__s(t, ["source", "verticalCenter", "x"], ["img_pagepoint_no", 323.5, 384]);
                return t;
            };
            __egretProto__.rightArrow_i = function () {
                var t = new egret.gui.UIAsset();
                this.rightArrow = t;
                this.__s(t, ["source", "x", "y"], ["img_pageRightBtn_1", 584, 330]);
                return t;
            };
            __egretProto__.scroll_i = function () {
                var t = new ItemScroll();
                this.scroll = t;
                this.__s(t, ["height", "verticalCenter", "width", "x"], [756, -105, 498, 71]);
                t.viewport = this.__9_i();
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Move();
                this.__s(t, ["repeatBehavior", "xFrom", "xTo"], ["loop", 0, 50]);
                return t;
            };
            ActivitySceneSkin._skinParts = ["scroll", "konwBtn", "knowPng", "radio1", "radio2", "radio3", "radio4", "circle", "leftArrow", "rightArrow"];
            return ActivitySceneSkin;
        })(egret.gui.Skin);
        scene.ActivitySceneSkin = ActivitySceneSkin;
        ActivitySceneSkin.prototype.__class__ = "skins.scene.ActivitySceneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
