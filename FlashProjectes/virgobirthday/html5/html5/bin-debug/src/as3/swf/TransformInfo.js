var egret;
(function (egret) {
    var TransformInfo = (function () {
        function TransformInfo() {
            /**
             * 转换矩阵
             */
            //public m:egret.Matrix = null;
            //public var matrix:Matrix = new Matrix();
            // 如果图像有旋转会影响缩放值, 旋转之后图形缩放值
            this.sx = 1;
            this.sy = 1;
            this.r = 0; //旋转角度
            this.tx = 0;
            this.ty = 0;
            // 颜色变换
            this.color = null;
        }
        var __egretProto__ = TransformInfo.prototype;
        __egretProto__.createFromObject = function (obj) {
            if (null == obj) {
                return;
            }
            for (var key in obj) {
                if (key == "m" && null != obj[key]) {
                    var em = new egret.Matrix();
                    egret.S2PUtils.TransFromObject(em, obj[key]);
                    if (this.hasOwnProperty(key)) {
                        this[key] = em;
                    }
                }
                else if (key == "color" && null != obj[key]) {
                    var c = new egret.EColorTransform();
                    egret.S2PUtils.TransFromObject(c, obj[key]);
                    if (this.hasOwnProperty(key)) {
                        this[key] = c;
                    }
                }
                else {
                    this[key] = obj[key];
                }
            }
        };
        return TransformInfo;
    })();
    egret.TransformInfo = TransformInfo;
    TransformInfo.prototype.__class__ = "egret.TransformInfo";
})(egret || (egret = {}));
