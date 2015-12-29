var egret;
(function (egret) {
    var RecordInfo = (function () {
        function RecordInfo() {
            this.fontId = 0;
            this.color = null;
            this.textHeight = 0;
            /**
             * 字符在font里的index
             */
            this.glyp = [];
            /**
             * 每个字符的增量
             */
            this.advances = [];
        }
        var __egretProto__ = RecordInfo.prototype;
        __egretProto__.fromObject = function (obj) {
            for (var key in obj) {
                if ("color" == key) {
                    if (this.hasOwnProperty(key)) {
                        var c = new egret.EColorTransform();
                        egret.S2PUtils.TransFromObject(c, obj[key]);
                        this[key] = c;
                    }
                }
                else {
                    this[key] = obj[key];
                }
            }
        };
        return RecordInfo;
    })();
    egret.RecordInfo = RecordInfo;
    RecordInfo.prototype.__class__ = "egret.RecordInfo";
})(egret || (egret = {}));
