var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var PopupBoxUISkin = (function (_super) {
            __extends(PopupBoxUISkin, _super);
            function PopupBoxUISkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [50, 300]);
                this.elementsContent = [this.__3_i(), this.msgLabel_i()];
                this.states = [
                    new egret.gui.State("normal", [
                    ]),
                    new egret.gui.State("disabled", [
                    ])
                ];
            }
            var d = __define,c=PopupBoxUISkin;p=c.prototype;
            d(p, "skinParts"
                ,function () {
                    return PopupBoxUISkin._skinParts;
                }
            );
            p.msgLabel_i = function () {
                var t = new egret.gui.Label();
                this.msgLabel = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "textColor", "verticalAlign", "width"], ["宋体", 50, 18, "123", "center", 0x0A0000, "middle", 300]);
                return t;
            };
            p.__3_i = function () {
                var t = new egret.gui.Rect();
                t.setStyle("textColor", 0xF9F3F3);
                this.__s(t, ["fillAlpha", "fillColor", "height", "width"], [0.8, 0xF9F2F2, 50, 300]);
                return t;
            };
            PopupBoxUISkin._skinParts = ["msgLabel"];
            return PopupBoxUISkin;
        })(egret.gui.Skin);
        ui.PopupBoxUISkin = PopupBoxUISkin;
        egret.registerClass(PopupBoxUISkin,"skins.ui.PopupBoxUISkin");
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
