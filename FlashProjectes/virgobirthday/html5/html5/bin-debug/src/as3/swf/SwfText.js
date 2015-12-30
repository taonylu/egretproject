var egret;
(function (egret) {
    var SwfText = (function (_super) {
        __extends(SwfText, _super);
        function SwfText(_resConf, text) {
            _super.call(this);
            this.$instanceName = "";
            this.resConf = null;
            this.$flashText = new egret.TextField();
            this.resConf = _resConf;
            if (text.wasstatic && text.text == "" && text.glyphText != null) {
                this.$createBitmapText(text);
            }
            else {
                this.$createStdText(text);
            }
        }
        var __egretProto__ = SwfText.prototype;
        Object.defineProperty(__egretProto__, "instanceName", {
            get: function () {
                return this.$instanceName;
            },
            set: function (value) {
                this.name = value;
                this.$instanceName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "text", {
            get: function () {
                if (null != this.$flashText) {
                    return this.$flashText.text;
                }
                return "";
            },
            set: function (value) {
                if (null != this.$flashText) {
                    this.$flashText.text = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "defaultTextFormat", {
            /**
             * 指定应用于新插入文本（例如，使用 replaceSelectedText() 方法插入的文本或用户输入的文本）的格式。
             * @returns {null}
             */
            get: function () {
                if (this.$textFormat == null) {
                    this.$textFormat = new flash.TextFormat();
                }
                return this.$textFormat;
            },
            set: function (_value) {
                this.$textFormat = _value;
                console.log("待实现~~~");
            },
            enumerable: true,
            configurable: true
        });
        /**
         * egret 没有静态文本，只有动态文本与输入文本
         * @param text
         */
        __egretProto__.$createStdText = function (text) {
            this.$flashText = new egret.TextField();
            this.addChild(this.$flashText);
            if (text.readOnly) {
                this.$flashText.type = egret.TextFieldType.DYNAMIC;
            }
            else {
                this.$flashText.type = egret.TextFieldType.INPUT;
            }
            this.$flashText.text = text.text;
            //this.$flashText.htmlText = text.htmlText;
            this.$flashText.x += text.x;
            this.$flashText.y += text.y;
            this.$flashText.height = text.h;
            this.$flashText.width = text.w;
            this.$flashText.multiline = text.multiline;
            //this.$flashText.wordWrap = text.wordWrap;//不要设置wordWarp，否则多行文本不会换行。wordWarp会将文本当成单词
            this.$flashText.maxChars = text.maxLength;
            this.$flashText.size = text.size;
            this.$flashText.bold = text.tb;
            this.$flashText.italic = text.ti;
            this.$flashText.textAlign = text.ta;
            this.$flashText.textColor = text.tc;
            this.$flashText._TF_Props_._textColorString = this.$toColorString(text.tc); // 等待egret 2.0.5更新后直接支持带alpha通道文本颜色后可删除
            this.$flashText.border = text.border;
            this.$flashText.displayAsPassword = text.password;
            this.$flashText.textAlign = text.ta; //文本水平对齐方式使用HorizontalAlign定义的常量
            this.$flashText.verticalAlign = egret.VerticalAlign.TOP; //默认值为 VerticalAlign.TOP。
        };
        // 等待egret 2.0.5更新后直接支持带alpha通道文本颜色后可删除
        __egretProto__.$toColorString = function (value) {
            if (isNaN(value) || value < 0) {
                value = 0;
            }
            var color = value.toString(16).toUpperCase();
            while (color.length > 6) {
                color = color.slice(1, color.length);
            }
            while (color.length < 6) {
                color = "0" + color;
            }
            return "#" + color;
        };
        /**
         * 创建位图文本，消除锯齿文本以位图的形式创建。
         * @param text
         */
        __egretProto__.$createBitmapText = function (text) {
            // 静态文本 使用glyp字体
            if (text.text == "" && text.glyphText != null) {
                var shapePNGParent = new egret.DisplayObjectContainer();
                this.addChild(shapePNGParent);
                shapePNGParent.x += text.x;
                shapePNGParent.y += text.y;
                var totalAdvance = 0;
                for (var index = 0; index < text.glyphText.info.length; index++) {
                    var rec = text.glyphText.info[index];
                    for (var glypindex = 0; glypindex < rec.glyp.length; glypindex++) {
                        var shapePNG = egret.SwfRes.Pool_getByID(this.resConf.path, this.resConf, rec.fontId, (rec.glyp[glypindex]));
                        var colorTF = new egret.ColorTransform(rec.color.rm, rec.color.gm, rec.color.bm, rec.color.am, rec.color.ro, rec.color.go, rec.color.bo, rec.color.ao);
                        shapePNG.transform.colorTransform = colorTF; //已经可以改变显示对象的颜色了
                        shapePNG.alpha = rec.color.am; //设置透明度
                        shapePNGParent.addChild(shapePNG);
                        shapePNG.x = totalAdvance;
                        totalAdvance += rec.advances[glypindex];
                    }
                }
            }
        };
        return SwfText;
    })(egret.DisplayObjectContainer);
    egret.SwfText = SwfText;
    SwfText.prototype.__class__ = "egret.SwfText";
})(egret || (egret = {}));
