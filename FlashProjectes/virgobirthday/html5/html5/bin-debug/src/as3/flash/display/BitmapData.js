/**
 * Created by mengj_000 on 2015/4/27.
 */
var flash;
(function (flash) {
    var BitmapData = (function (_super) {
        __extends(BitmapData, _super);
        function BitmapData(width, height, transparent, fillColor, txt) {
            if (transparent === void 0) { transparent = true; }
            if (fillColor === void 0) { fillColor = 0xFFFFFFFF; }
            _super.call(this);
            this.$lock = false;
            if (txt) {
                this._setBitmapData(txt._bitmapData);
                this.init();
                this.setSize(txt._textureWidth, txt._textureHeight);
                this._drawImage(txt, 0, 0, txt._textureWidth, txt._textureHeight, 0, 0, txt._textureWidth, txt._textureHeight);
            }
            else {
                var graphics = BitmapData.shape.graphics;
                var alpha;
                if (!transparent) {
                    alpha = 1;
                }
                else {
                    alpha = Math.floor(fillColor / Math.pow(2, 24)) / 255;
                }
                this.$transparent = transparent;
                graphics.clear();
                graphics.beginFill(fillColor & 0xFFFFFF, alpha);
                graphics.drawRect(0, 0, width, height);
                graphics.endFill();
                this.drawToTexture(BitmapData.shape, new egret.Rectangle(0, 0, width, height));
            }
        }
        var __egretProto__ = BitmapData.prototype;
        Object.defineProperty(__egretProto__, "transparent", {
            get: function () {
                return this.$transparent;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.initWidthTexture = function (width, height, transparent, fillColor, txt) {
            if (txt) {
                this._setBitmapData(txt._bitmapData);
                this.init();
                this.setSize(txt._textureWidth, txt._textureHeight);
                this._drawImage(txt, 0, 0, txt._textureWidth, txt._textureHeight, 0, 0, txt._textureWidth, txt._textureHeight);
            }
            else {
                var graphics = BitmapData.shape.graphics;
                var alpha;
                if (!transparent) {
                    alpha = 1;
                }
                else {
                    alpha = Math.floor(fillColor / Math.pow(2, 24)) / 255;
                }
                this.$transparent = transparent;
                graphics.clear();
                graphics.beginFill(fillColor & 0xFFFFFF, alpha);
                graphics.drawRect(0, 0, width, height);
                graphics.endFill();
                this.drawToTexture(BitmapData.shape, new egret.Rectangle(0, 0, width, height));
            }
        };
        /**
         * 设置 BitmapData 对象的单个像素。
         * @method as3.BitmapData#setPixel
         */
        __egretProto__.setPixel = function (x, y, color) {
            this._fill(x, y, 1, 1, color, false, false);
        };
        Object.defineProperty(__egretProto__, "rect", {
            get: function () {
                if (this.$rect == null)
                    this.$rect = new egret.Rectangle();
                this.$rect.width = this.textureWidth;
                this.$rect.height = this.textureHeight;
                return this.$rect;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._fill = function (x, y, width, height, color, clear, hasAlpha) {
            if (clear === void 0) { clear = false; }
            if (hasAlpha === void 0) { hasAlpha = true; }
            var graphics = BitmapData.shape.graphics;
            var alpha;
            if (hasAlpha) {
                alpha = Math.floor(color / Math.pow(2, 24)) / 255;
            }
            else {
                alpha = 1;
            }
            graphics.clear();
            graphics.beginFill(color & 0xFFFFFF, alpha);
            graphics.drawRect(0, 0, width, height);
            graphics.endFill();
            BitmapData.renderTexture.drawToTexture(BitmapData.shape, new egret.Rectangle(0, 0, width, height));
            if (clear) {
            }
            this._drawImage(BitmapData.renderTexture, 0, 0, width, height, x, y, width, height);
        };
        Object.defineProperty(__egretProto__, "width", {
            /**
             * 位图图像的宽度，以像素为单位。
             * @member {number} as3.BitmapData#width
             */
            get: function () {
                return this._textureWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "height", {
            /**
             * 位图图像的高度，以像素为单位。
             * @member {number} as3.BitmapData#height
             */
            get: function () {
                return this._textureHeight;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 为没有拉伸、旋转或色彩效果的图像之间的像素处理提供一个快速例程。此方法在目标 BitmapData 对象的目标点将源图像的矩形区域复制为同样大小的矩形区域。
         * @method as3.BitmapData#copyPixels
         * @param sourceBitmapData {as3.BitmapData} 要从中复制像素的输入位图图像。源图像可以是另一个 BitmapData 实例，也可以指当前 BitmapData 实例。
         * @param sourceRect {egret.Rectangle} 定义要用作输入的源图像区域的矩形。
         * @param destPoint {egret.Point} 目标点，它表示将在其中放置新像素的矩形区域的左上角。
         */
        __egretProto__.copyPixels = function (sourceBitmapData, sourceRect, destPoint, alphaBitmapData, alphaPoint, mergeAlpha) {
            if (alphaBitmapData === void 0) { alphaBitmapData = null; }
            if (alphaPoint === void 0) { alphaPoint = null; }
            if (mergeAlpha === void 0) { mergeAlpha = false; }
            this._drawImage(sourceBitmapData, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destPoint.x, destPoint.y, sourceRect.width, sourceRect.height);
        };
        __egretProto__._drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight) {
            var context = this.renderContext;
            this.begin();
            if (context["gl"]) {
                context = this["canvasContext"];
                context.drawImage(texture._bitmapData, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            }
            else {
                context.drawImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            }
            this.end();
        };
        __egretProto__.clone = function () {
            var rect = new flash.Rectangle(0, 0, this.width, this.height);
            var pt = new egret.Point(0, 0);
            var b = new flash.BitmapData(this.width, this.height);
            b.copyPixels(this, rect, pt);
            return b;
        };
        __egretProto__.lock = function () {
            this.$lock = true;
        };
        __egretProto__.unlock = function (changeRect) {
            if (changeRect === void 0) { changeRect = null; }
            this.$lock = false;
        };
        /**
         * 2015.9.6 by chenpeng
         * 模拟flash.display.BitmapData.draw()方法，注意不能直接使用draw来命名，基类已经有了draw接口了
         * @param source 只支持显示对象
         * @param matrix 不支持
         * @param colorTransform 不支持
         * @param blendMode 不支持
         * @param clipRect 支持
         * @param smoothing 不支持
         */
        __egretProto__.draw2 = function (source, matrix, colorTransform, blendMode, clipRect, smoothing) {
            if (matrix === void 0) { matrix = null; }
            if (colorTransform === void 0) { colorTransform = null; }
            if (blendMode === void 0) { blendMode = null; }
            if (clipRect === void 0) { clipRect = null; }
            if (smoothing === void 0) { smoothing = false; }
            if (!clipRect) {
                clipRect = new egret.Rectangle(0, 0, source.width, source.height);
            }
            this.drawToTexture(source, clipRect, 1);
        };
        /**
         * 2015.9.6 by chenpeng
         * 模拟flash.display.BitmapData.drawWithQuality()方法
         * @param source 只支持显示对象
         * @param matrix 不支持
         * @param colorTransform 不支持
         * @param blendMode 不支持
         * @param clipRect 支持
         * @param smoothing 不支持
         * @param quality 不支持
         */
        __egretProto__.drawWithQuality2 = function (source, matrix, colorTransform, blendMode, clipRect, smoothing, quality) {
            if (matrix === void 0) { matrix = null; }
            if (colorTransform === void 0) { colorTransform = null; }
            if (blendMode === void 0) { blendMode = null; }
            if (clipRect === void 0) { clipRect = null; }
            if (smoothing === void 0) { smoothing = false; }
            if (quality === void 0) { quality = null; }
            this.draw2(source, matrix, colorTransform, blendMode, clipRect, smoothing);
        };
        BitmapData.shape = new egret.Shape();
        BitmapData.renderTexture = new egret.RenderTexture();
        return BitmapData;
    })(egret.RenderTexture);
    flash.BitmapData = BitmapData;
    BitmapData.prototype.__class__ = "flash.BitmapData";
})(flash || (flash = {}));
