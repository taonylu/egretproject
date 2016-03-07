var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var LoadingAnimSkin = (function (_super) {
            __extends(LoadingAnimSkin, _super);
            function LoadingAnimSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [150, 150]);
                this.transitions = [this.__6_i()];
                this.elementsContent = [this.__3_i(), this.circle_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = LoadingAnimSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return LoadingAnimSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rotate();
                this.__4 = t;
                this.__s(t, ["angleTo", "duration", "repeatBehavior", "repeatCount", "target"], [360, 1000, "loop", 0, this.circle]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Parallel();
                t.children = [this.__4_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Transition();
                this.__s(t, ["fromState", "toState"], ["normal", "rotate"]);
                t.effect = this.__5_i();
                return t;
            };
            __egretProto__.circle_i = function () {
                var t = new egret.gui.UIAsset();
                this.circle = t;
                this.__s(t, ["source", "x", "y"], ["img_loading_1", 18, 18]);
                if (this.__4) {
                    this.__4.target = this.circle;
                }
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["img_loading_2", 39, 33]);
                return t;
            };
            LoadingAnimSkin._skinParts = ["circle"];
            return LoadingAnimSkin;
        })(egret.gui.Skin);
        ui.LoadingAnimSkin = LoadingAnimSkin;
        LoadingAnimSkin.prototype.__class__ = "skins.ui.LoadingAnimSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
