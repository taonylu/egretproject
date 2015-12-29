/**
 * Created by huitao on 5/4/2015.
 */
var flash;
(function (flash) {
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            _super.call(this);
            this.$textFormat = new flash.TextFormat();
        }
        var __egretProto__ = TextField.prototype;
        Object.defineProperty(__egretProto__, "alwaysShowSelection", {
            get: function () {
                return this.$alwaysShowSelection;
            },
            set: function (_value) {
                this.$alwaysShowSelection = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "antiAliasType", {
            /**
             * 用于此文本字段的消除锯齿类型。  TextField
             */
            get: function () {
                return this.$antiAliasType;
            },
            set: function (_value) {
                this.$antiAliasType = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "autoSize", {
            /**
             * 控制文本字段的自动大小调整和对齐。  TextField
             */
            get: function () {
                return this.textAlign;
            },
            set: function (_value) {
                //this._autoSize = _value;
                this.textAlign = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "bottomScrollV", {
            /**
             * [read-only] 一个整数（从 1 开始的索引），指示指定文本字段中当前可以看到的最后一行。  TextField
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "condenseWhite", {
            //一个布尔值，它指定是否应删除具有 HTML 文本的文本字段中的额外空白（空格、换行符等）。  TextField
            get: function () {
                return this.$condenseWhite;
            },
            set: function (_value) {
                this.$condenseWhite = _value;
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
                this.setTextFormat(_value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "embedFonts", {
            /**
             * 指定是否使用嵌入字体轮廓进行呈现。
             */
            get: function () {
                return this.$embedFonts;
            },
            set: function (_value) {
                this.$embedFonts = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "gridFitType", {
            get: function () {
                return this.$gridFitType;
            },
            set: function (_value) {
                this.$gridFitType = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "htmlText", {
            // 包含文本字段内容的 HTML 表示形式。 TextField
            get: function () {
                return this.$htmlTxt;
            },
            set: function (_value) {
                this.$htmlTxt = _value;
                var html = new egret.HtmlTextParser();
                var arr = html.parser(_value);
                this.textFlow = arr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "length", {
            //   [read-only] 文本字段中的字符数。  TextField
            get: function () {
                return this.text.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "maxScrollH", {
            get: function () {
                return this.$maxScrollH;
            },
            set: function (_value) {
                this.$maxScrollH = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "mouseWheelEnabled", {
            //一个布尔值，指示当用户单击某个文本字段且用户滚动鼠标滚轮时，Flash Player 是否应自动滚动多行文本字段。  TextField
            get: function () {
                return this.$mouseWheelEnabled;
            },
            set: function (_value) {
                this.$mouseWheelEnabled = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "restrict", {
            /**
             * 指示用户可输入到文本字段中的字符集。
             */
            get: function () {
                return this.$restrict;
            },
            set: function (_value) {
                this.$restrict = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "scrollH", {
            //public scrollH : number
            //当前水平滚动位置。  TextField
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "selectable", {
            //一个布尔值，指示文本字段是否可选。  TextField
            get: function () {
                return this.$selectable;
            },
            set: function (_value) {
                this.$selectable = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "sharpness", {
            //此文本字段中字型边缘的清晰度。  TextField
            get: function () {
                return this.$sharpness;
            },
            set: function (_value) {
                this.$sharpness = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "styleSheet", {
            get: function () {
                return this.$styleSheet;
            },
            //将样式表附加到文本字段。  TextField
            set: function (_value) {
                this.$styleSheet = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "thickness", {
            //此文本字段中字型边缘的粗细。  TextField
            get: function () {
                return this.$thickness;
            },
            set: function (_value) {
                this.$thickness = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "useRichTextClipboard", {
            get: function () {
                return this.$useRichTextClipboard;
            },
            set: function (_value) {
                this.$useRichTextClipboard = _value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "wordWrap", {
            get: function () {
                return this.$wordWrap;
            },
            set: function (_value) {
                this.$wordWrap = _value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 返回一个矩形，该矩形是字符的边框。 TextField
         * @param charIndex
         */
        __egretProto__.getCharBoundaries = function (charIndex) {
            return null;
        };
        /**
         * 在 x 和 y 参数指定的位置返回从零开始的字符索引值。 TextField
         * @param x
         * @param y
         * @returns {number}
         */
        __egretProto__.getCharIndexAtPoint = function (x, y) {
            return 0;
        };
        /**
         * 如果给定一个字符索引，则返回同一段落中第一个字符的索引。 TextField
         * @param charIndex
         * @returns {number}
         */
        __egretProto__.getFirstCharInParagraph = function (charIndex) {
            return 0;
        };
        /**
         * 返回给定 id 或已使用 <img> 标签添加到 HTML 格式文本字段中的图像或 SWF 文件的 DisplayObject 引用。 TextField
         * @param id
         * @returns {null}
         */
        __egretProto__.getImageReference = function (id) {
            return null;
        };
        /**
         * 在 x 和 y 参数指定的位置返回从零开始的行索引值。
         * @param x
         * @param y
         */
        __egretProto__.getLineIndexAtPoint = function (x, y) {
            return 0;
        };
        /**
         * 返回 charIndex 参数指定的字符所在的行的索引值（从零开始）。
         * @param charIndex
         * @returns {number}
         */
        __egretProto__.getLineIndexOfChar = function (charIndex) {
            return 0;
        };
        /**
         * 返回特定文本行中的字符数。 TextField
         * @param lineIndex
         * @returns {number}
         */
        __egretProto__.getLineLength = function (lineIndex) {
            return 0;
        };
        /**
         * 返回给定文本行的度量信息。 TextField
         * @param lineIndex
         */
        __egretProto__.getLineMetrics = function (lineIndex) {
            return null;
        };
        /**
         * 返回 lineIndex 参数指定的行中第一个字符的字符索引。
         * @param lineIndex
         * @returns {number}
         */
        __egretProto__.getLineOffset = function (lineIndex) {
            return 0;
        };
        /**
         * 返回 lineIndex 参数指定的行的文本。 TextField
         * @param lineIndex
         */
        __egretProto__.getLineText = function (lineIndex) {
            return null;
        };
        /**
         * 如果给定一个字符索引，则返回包含给定字符的段落的长度。
         * @param charIndex
         * @returns {number}
         */
        __egretProto__.getParagraphLength = function (charIndex) {
            return 0;
        };
        /**
         * 返回 TextFormat 对象，其中包含 beginIndex 和 endIndex 参数指定的文本范围的格式信息。
         * @param beginIndex
         * @param endIndex
         * @returns {null}
         */
        __egretProto__.getTextFormat = function (beginIndex, endIndex) {
            if (beginIndex === void 0) { beginIndex = -1; }
            if (endIndex === void 0) { endIndex = -1; }
            return this.$textFormat;
        };
        /**
         * 使用 value 参数的内容替换当前所选内容。
         * @param value
         */
        __egretProto__.replaceSelectedText = function (value) {
        };
        /**
         * 使用 newText 参数的内容替换 beginIndex 和 endIndex 参数指定的字符范围。 TextField
         * @param beginIndex
         * @param endIndex
         * @param newText
         */
        __egretProto__.replaceText = function (beginIndex, endIndex, newText) {
        };
        /**
         * 将第一个字符和最后一个字符的索引值（使用 beginIndex 和 endIndex 参数指定）指定的文本设置为所选内容。
         * @param beginIndex
         * @param endIndex
         */
        __egretProto__.setSelection = function (beginIndex, endIndex) {
            this._setSelection(beginIndex, endIndex);
        };
        /**
         * 将 format 参数指定的文本格式应用于文本字段中的指定文本。
         * @param format
         * @param beginIndex
         * @param endIndex
         */
        __egretProto__.setTextFormat = function (format, beginIndex, endIndex) {
            if (beginIndex === void 0) { beginIndex = -1; }
            if (endIndex === void 0) { endIndex = -1; }
            if (this.$textFormat) {
                this.$textFormat.clearText(this);
            }
            format.setText(this);
            this.$textFormat = format;
            if (format.font != null) {
                this.fontFamily = format.font;
            }
            if (format.size != null) {
                this.size = format.size;
            }
            if (format.color != null) {
                this.textColor = format.color;
            }
            if (format.bold != null) {
                this.bold = format.bold;
            }
            if (format.italic != null) {
                this.italic = format.italic;
            }
            //this.underline = format.underline;
            //this.url = format.url;
            //this.target = format.target;
            if (format.align != null) {
                this.autoSize = format.align;
            }
            //this.leftMargin = format.leftMargin;
            //this.rightMargin = format.rightMargin;
            //this.indent = format.indent;
            if (format.leading != null) {
                this.lineSpacing = format.leading;
            }
        };
        return TextField;
    })(egret.TextField);
    flash.TextField = TextField;
    TextField.prototype.__class__ = "flash.TextField";
})(flash || (flash = {}));
