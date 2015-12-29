var skins;
(function (skins) {
    var ui;
    (function (ui) {
        var ProductInfoSkin = (function (_super) {
            __extends(ProductInfoSkin, _super);
            function ProductInfoSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [342, 430]);
                this.elementsContent = [this.__3_i(), this.closeBtn_i(), this.contentLabel_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ProductInfoSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ProductInfoSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 40);
                t.setStyle("textAlign", "center");
                this.__s(t, ["horizontalCenter", "label", "skinName", "y"], [0, "确定", new egret.gui.ButtonSkin("img_btn"), 226]);
                return t;
            };
            __egretProto__.contentLabel_i = function () {
                var t = new egret.gui.Label();
                this.contentLabel = t;
                this.__s(t, ["height", "text", "textAlign", "verticalAlign", "width", "x", "y"], [159, "学习作品", "center", "middle", 267, 69, 36]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "img_back";
                return t;
            };
            ProductInfoSkin._skinParts = ["closeBtn", "contentLabel"];
            return ProductInfoSkin;
        })(egret.gui.Skin);
        ui.ProductInfoSkin = ProductInfoSkin;
        ProductInfoSkin.prototype.__class__ = "skins.ui.ProductInfoSkin";
    })(ui = skins.ui || (skins.ui = {}));
})(skins || (skins = {}));
