var egret;
(function (egret) {
    var DefineText = (function (_super) {
        __extends(DefineText, _super);
        function DefineText(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this);
            this.text = "";
            this.htmlText = "";
            /**
             * 字形文本（针对消除锯齿类的文本，存放文本索引，从对应的字体定义中读取字体图片）
             * 静态文本使用消除锯齿会有这个属性
             */
            this.glyphText = null;
            /**
             * 静态文本 动态文本
             */
            this.wasstatic = true;
            /**
             * 只读属性 区分输入文本与其他,
             * 默认是非输入文本true, 输入文本false
             */
            this.readOnly = true;
            this.password = false;
            this.maxLength = 0;
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
            this.size = 12;
            /**
             * textcolor
             */
            this.tc = 0;
            /**
             * text font
             */
            this.tf = "";
            this.fontId = 0;
            /**
             * text bold
             */
            this.tb = false;
            /**
             * text align
             */
            this.ta = "left";
            /**
             * italic
             */
            this.ti = false;
            this.border = false;
            this.createFromObject(obj);
            this.t = egret.Config.RESText;
        }
        var __egretProto__ = DefineText.prototype;
        __egretProto__.saveKey = function (key, keyobj) {
            if (key == "glyphText") {
                var glyphText = new egret.GlyphText();
                if (null != keyobj) {
                    glyphText.info = new Array();
                    var info = keyobj["info"];
                    for (var index = 0; index < info.length; index++) {
                        var recInfo = new egret.RecordInfo();
                        recInfo.fromObject(info[index]);
                        glyphText.info[index] = recInfo;
                    }
                }
                if (this.hasOwnProperty(key)) {
                    this[key] = glyphText;
                }
                return true;
            }
            return false;
        };
        __egretProto__.createFromObject = function (obj) {
            _super.prototype.createFromObject.call(this, obj);
            if (null == obj) {
                return;
            }
            if (obj instanceof Array) {
                this.text = obj[2];
                this.htmlText = obj[3];
                //this.glyphText = obj[4];
                this.wasstatic = obj[5];
                this.readOnly = obj[6];
                this.password = obj[7];
                this.multiline = obj[8];
                this.wordWrap = obj[9];
                this.maxLength = obj[10];
                this.x = obj[11];
                this.y = obj[12];
                this.w = obj[13];
                this.h = obj[14];
                this.size = obj[15];
                this.tc = obj[16];
                this.tf = obj[17];
                this.fontId = obj[18];
                this.tb = obj[19];
                this.ta = obj[20];
                this.ti = obj[21];
                this.border = obj[22];
            }
        };
        DefineText.Static = 1;
        DefineText.Dynamic = 2;
        return DefineText;
    })(egret.DefineBase);
    egret.DefineText = DefineText;
    DefineText.prototype.__class__ = "egret.DefineText";
})(egret || (egret = {}));
