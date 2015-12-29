var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var StartBtnSkin = (function (_super) {
            __extends(StartBtnSkin, _super);
            function StartBtnSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [55, 250]);
                this.elementsContent = [this.__3_i(), this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = StartBtnSkin.prototype;
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x14CD4E, 55, 250]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "text", "textColor", "touchEnabled", "verticalCenter"], ["宋体", 0, "开始游戏", 0xFBF7F7, false, 0]);
                return t;
            };
            return StartBtnSkin;
        })(egret.gui.Skin);
        ui.StartBtnSkin = StartBtnSkin;
        StartBtnSkin.prototype.__class__ = "skins.ui.StartBtnSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
