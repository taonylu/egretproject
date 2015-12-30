/**
 * Created by mengj_000 on 2015/4/27.
 */
var flash;
(function (flash) {
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap(bitmapData, pixelSnapping, smoothing, preLoadingURL) {
            _super.call(this);
            if (bitmapData)
                this.bitmapData = bitmapData;
            this.$pixelSnapping = pixelSnapping == undefined ? "auto" : pixelSnapping;
            this.$smoothing = smoothing == undefined ? false : smoothing;
            if (preLoadingURL != undefined) {
                this.bitmapData = LoadingUI.getEmbedBitmapData(preLoadingURL);
            }
        }
        var __egretProto__ = Bitmap.prototype;
        Object.defineProperty(__egretProto__, "pixelSnapping", {
            get: function () {
                return this.$pixelSnapping;
            },
            set: function (val) {
                this.$pixelSnapping = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "smoothing", {
            get: function () {
                return this.$smoothing;
            },
            set: function (val) {
                this.$smoothing = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "bitmapData", {
            get: function () {
                return this.texture;
            },
            /**
             * 设置位图数据
             * @param val
             */
            set: function (bitmapData) {
                this.texture = bitmapData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "scaleX", {
            /// 与flash保持一致性：width与scaleX联动，height与scaleY联动
            // measuredWidth在Bitmap中不会改变
            // scaleX由width计算得到。宽度与scaleX的关系：scaleX = width / measuredWidth;
            get: function () {
                return this.width / this.measuredWidth;
            },
            set: function (value) {
                this.width = value * this.measuredWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "scaleY", {
            // scaleY由height计算得到。高度与scaleY的关系：scaleY = height / measuredHeight;
            get: function () {
                return this.height / this.measuredHeight;
            },
            set: function (value) {
                this.height = value * this.measuredHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "width", {
            // width使用父类的
            get: function () {
                return this._getWidth();
            },
            set: function (value) {
                this._setWidth(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "height", {
            get: function () {
                return this._getHeight();
            },
            set: function (value) {
                this._setHeight(value);
            },
            enumerable: true,
            configurable: true
        });
        return Bitmap;
    })(egret.Bitmap);
    flash.Bitmap = Bitmap;
    Bitmap.prototype.__class__ = "flash.Bitmap";
})(flash || (flash = {}));
