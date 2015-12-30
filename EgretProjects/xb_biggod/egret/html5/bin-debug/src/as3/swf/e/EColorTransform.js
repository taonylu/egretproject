var egret;
(function (egret) {
    var EColorTransform = (function () {
        function EColorTransform(color) {
            if (color === void 0) { color = null; }
            /// 颜色变换 在egret下dragonBones.ColorTransform支持的属性如下
            //redOffset: number		红色值偏移，计算时用加法
            this.ro = 0;
            //greenOffset: number		绿色值偏移，计算时用加法
            this.go = 0;
            //blueOffset: number		蓝色值偏移，计算时用加法
            this.bo = 0;
            //alphaOffset: number		透明度偏移，计算时用加法
            this.ao = 0;
            //redMultiplier: number		红色值增幅，计算时用乘法
            this.rm = 0;
            //greenMultiplier: number		绿色值增幅，计算时用乘法
            this.gm = 0;
            //blueMultiplier: number		蓝色值增幅，计算时用乘法
            this.bm = 0;
            //alphaMultiplier: number	透明度增幅，计算时用乘法
            this.am = 1;
            this.createFromObject(color);
        }
        var __egretProto__ = EColorTransform.prototype;
        __egretProto__.createFromObject = function (obj) {
            if (null == obj) {
                return;
            }
            if (obj instanceof Array) {
                this.fromSlimData(obj);
            }
            else if (obj == "" || !obj) {
            }
            else {
                this.CopyFromColor(obj);
            }
        };
        __egretProto__.fromSlimData = function (sd) {
            if (sd instanceof Array) {
                this.rm = sd[0];
                this.gm = sd[1];
                this.bm = sd[2];
                this.am = sd[3];
                this.ro = sd[4];
                this.go = sd[5];
                this.bo = sd[6];
                this.ao = sd[7];
            }
        };
        __egretProto__.CopyFromColor = function (color) {
            if (color === void 0) { color = null; }
            if (null != color) {
                this.ro = color.blueMultiplier;
                this.go = color.greenOffset;
                this.bo = color.blueOffset;
                this.ao = color.alphaOffset;
                this.rm = color.redMultiplier;
                this.gm = color.greenMultiplier;
                this.bm = color.blueMultiplier;
                this.am = color.alphaMultiplier;
            }
        };
        return EColorTransform;
    })();
    egret.EColorTransform = EColorTransform;
    EColorTransform.prototype.__class__ = "egret.EColorTransform";
})(egret || (egret = {}));
