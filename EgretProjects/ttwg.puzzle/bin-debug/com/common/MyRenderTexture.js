var egret;
(function (egret) {
    var blendModes = ["source-over", "lighter", "destination-out"];
    var defaultCompositeOp = "source-over";
    /**
     * @language en_US
     * RenderTexture is a dynamic texture
     * @extends egret.Texture
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/RenderTexture.ts
     */
    /**
     * @language zh_CN
     * RenderTexture 是动态纹理类，他实现了将显示对象及其子对象绘制成为一个纹理的功能
     * @extends egret.Texture
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/RenderTexture.ts
     */
    var MyRenderTexture = (function (_super) {
        __extends(MyRenderTexture, _super);
        function MyRenderTexture() {
            _super.call(this);
            this.$displayListMap = {};
        }
        var d = __define,c=MyRenderTexture;p=c.prototype;
        /**
         * @language en_US
         * The specified display object is drawn as a texture
         * @param displayObject {egret.DisplayObject} the display to draw
         * @param clipBounds {egret.Rectangle} clip rect
         * @param scale {number} scale factor
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将指定显示对象绘制为一个纹理
         * @param displayObject {egret.DisplayObject} 需要绘制的显示对象
         * @param clipBounds {egret.Rectangle} 绘制矩形区域
         * @param scale {number} 缩放比例
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.drawToTexture = function (displayObject, clipBounds, scale) {
            if (scale === void 0) { scale = 1; }
            if (clipBounds && (clipBounds.width == 0 || clipBounds.height == 0)) {
                return false;
            }
            this.dispose();
            //todo clipBounds?
            var bounds = clipBounds || displayObject.$getOriginalBounds();
            if (bounds.width == 0 || bounds.height == 0) {
                return false;
            }
            scale /= egret.$TextureScaleFactor;
            //var width = (bounds.x + bounds.width) * scale;
            //var height = (bounds.y + bounds.height) * scale;
            var width = (bounds.width) * scale;
            var height = (bounds.height) * scale;
            this.context = this.createRenderContext(width, height);
            if (!this.context) {
                return false;
            }
            this.$update(displayObject);
            var c1 = new egret.DisplayObjectContainer();
            c1.$children.push(displayObject);
            c1.scaleX = c1.scaleY = scale;
            if (clipBounds) {
                var scrollRect = new egret.Rectangle();
                scrollRect.setTo(clipBounds.x, clipBounds.y, clipBounds.width, clipBounds.height);
                c1.scrollRect = scrollRect;
            }
            var root = new egret.DisplayObjectContainer();
            this.rootDisplayList = egret.sys.DisplayList.create(root);
            root.$displayList = this.rootDisplayList;
            root.addChild(c1);
            //保存绘制矩阵
            var renderMatrix = displayObject.$renderMatrix;
            var renderMatrixA = renderMatrix.a;
            var renderMatrixB = renderMatrix.b;
            var renderMatrixC = renderMatrix.c;
            var renderMatrixD = renderMatrix.d;
            var renderMatrixTx = renderMatrix.tx;
            var renderMatrixTy = renderMatrix.ty;
            renderMatrix.identity();
            //应用裁切
            if (clipBounds) {
                renderMatrix.translate(-clipBounds.x, -clipBounds.y);
            }
            root.$displayList = null;
            this.context.clearRect(0, 0, width, height);
            var drawCalls = this.drawDisplayObject(root, this.context, null);
            renderMatrix.setTo(renderMatrixA, renderMatrixB, renderMatrixC, renderMatrixD, renderMatrixTx, renderMatrixTy);
            this._setBitmapData(this.context.surface);
            //设置纹理参数
            this.$initData(0, 0, width, height, 0, 0, width, height, width, height);
            this.$reset(displayObject);
            this.$displayListMap = {};
            return true;
        };
        p.$update = function (displayObject) {
            this.$displayListMap[displayObject.$hashCode] = displayObject.$parentDisplayList;
            if (displayObject.$renderRegion) {
                displayObject.$renderRegion.moved = true;
                displayObject.$update();
            }
            if (displayObject instanceof egret.DisplayObjectContainer) {
                var children = displayObject.$children;
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    this.$update(child);
                }
            }
        };
        p.$reset = function (displayObject) {
            displayObject.$parentDisplayList = this.$displayListMap[displayObject.$hashCode];
            displayObject.$removeFlags(768 /* Dirty */);
            if (displayObject instanceof egret.DisplayObjectContainer) {
                var children = displayObject.$children;
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    this.$reset(child);
                }
            }
        };
        p.drawDisplayObject = function (displayObject, context, rootMatrix) {
            var drawCalls = 0;
            var node;
            var globalAlpha;
            if (displayObject.$renderRegion) {
                node = displayObject;
                globalAlpha = displayObject.$renderAlpha;
            }
            if (node) {
                drawCalls++;
                context.globalAlpha = globalAlpha;
                var m = node.$renderMatrix;
                if (rootMatrix) {
                    context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                    node.$render(context);
                    context.setTransform(rootMatrix.a, rootMatrix.b, rootMatrix.c, rootMatrix.d, rootMatrix.tx, rootMatrix.ty);
                }
                else {
                    context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                    node.$render(context);
                }
            }
            var children = displayObject.$children;
            if (children) {
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    if (!child.$visible || child.$alpha <= 0 || child.$maskedObject) {
                        continue;
                    }
                    if (child.$blendMode !== 0 || child.$mask) {
                        drawCalls += this.drawWithClip(child, context, rootMatrix);
                    }
                    else if (child.$scrollRect || child.$maskRect) {
                        drawCalls += this.drawWithScrollRect(child, context, rootMatrix);
                    }
                    else {
                        drawCalls += this.drawDisplayObject(child, context, rootMatrix);
                    }
                }
            }
            return drawCalls;
        };
        p.drawWithClip = function (displayObject, context, rootMatrix) {
            var drawCalls = 0;
            var hasBlendMode = (displayObject.$blendMode !== 0);
            if (hasBlendMode) {
                var compositeOp = blendModes[displayObject.$blendMode];
                if (!compositeOp) {
                    compositeOp = defaultCompositeOp;
                }
            }
            var scrollRect = displayObject.$scrollRect;
            var mask = displayObject.$mask;
            //计算scrollRect和mask的clip区域是否需要绘制，不需要就直接返回，跳过所有子项的遍历。
            var maskRegion;
            var displayMatrix = displayObject.$getConcatenatedMatrix();
            if (mask) {
                var bounds = mask.$getOriginalBounds();
                maskRegion = egret.sys.Region.create();
                maskRegion.updateRegion(bounds, mask.$getConcatenatedMatrix());
            }
            var region;
            if (scrollRect) {
                region = egret.sys.Region.create();
                region.updateRegion(scrollRect, displayMatrix);
            }
            if (region && maskRegion) {
                region.intersect(maskRegion);
                egret.sys.Region.release(maskRegion);
            }
            else if (!region && maskRegion) {
                region = maskRegion;
            }
            if (region) {
                if (region.isEmpty()) {
                    egret.sys.Region.release(region);
                    return drawCalls;
                }
            }
            else {
                region = egret.sys.Region.create();
                bounds = displayObject.$getOriginalBounds();
                region.updateRegion(bounds, displayObject.$getConcatenatedMatrix());
            }
            //绘制显示对象自身，若有scrollRect，应用clip
            var displayContext = this.createRenderContext(region.width, region.height);
            if (!displayContext) {
                drawCalls += this.drawDisplayObject(displayObject, context, rootMatrix);
                egret.sys.Region.release(region);
                return drawCalls;
            }
            if (scrollRect) {
                var m = displayMatrix;
                displayContext.setTransform(m.a, m.b, m.c, m.d, m.tx - region.minX, m.ty - region.minY);
                displayContext.beginPath();
                displayContext.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
                displayContext.clip();
            }
            displayContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
            var rootM = egret.Matrix.create().setTo(1, 0, 0, 1, -region.minX, -region.minY);
            drawCalls += this.drawDisplayObject(displayObject, displayContext, rootM);
            egret.Matrix.release(rootM);
            //绘制遮罩
            if (mask) {
                var maskContext = this.createRenderContext(region.width, region.height);
                if (!maskContext) {
                    drawCalls += this.drawDisplayObject(displayObject, context, rootMatrix);
                    egret.sys.surfaceFactory.release(displayContext.surface);
                    egret.sys.Region.release(region);
                    return drawCalls;
                }
                maskContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
                rootM = egret.Matrix.create().setTo(1, 0, 0, 1, -region.minX, -region.minY);
                var calls = this.drawDisplayObject(mask, maskContext, rootM);
                egret.Matrix.release(rootM);
                if (calls > 0) {
                    drawCalls += calls;
                    displayContext.globalCompositeOperation = "destination-in";
                    displayContext.setTransform(1, 0, 0, 1, 0, 0);
                    displayContext.globalAlpha = 1;
                    displayContext.drawImage(maskContext.surface, 0, 0);
                }
                egret.sys.surfaceFactory.release(maskContext.surface);
            }
            //绘制结果到屏幕
            if (drawCalls > 0) {
                drawCalls++;
                if (hasBlendMode) {
                    context.globalCompositeOperation = compositeOp;
                }
                context.setTransform(1, 0, 0, 1, region.minX, region.minY);
                context.drawImage(displayContext.surface, 0, 0);
                if (hasBlendMode) {
                    context.globalCompositeOperation = defaultCompositeOp;
                }
            }
            egret.sys.surfaceFactory.release(displayContext.surface);
            egret.sys.Region.release(region);
            return drawCalls;
        };
        p.drawWithScrollRect = function (displayObject, context, rootMatrix) {
            var drawCalls = 0;
            var scrollRect = displayObject.$scrollRect ? displayObject.$scrollRect : displayObject.$maskRect;
            if (scrollRect.width == 0 || scrollRect.height == 0) {
                return drawCalls;
            }
            var m = displayObject.$getConcatenatedMatrix();
            var region = egret.sys.Region.create();
            if (!scrollRect.isEmpty()) {
                region.updateRegion(scrollRect, m);
            }
            if (region.isEmpty()) {
                egret.sys.Region.release(region);
                return drawCalls;
            }
            //绘制显示对象自身
            context.save();
            if (rootMatrix) {
                context.setTransform(rootMatrix.a, rootMatrix.b, rootMatrix.c, rootMatrix.d, rootMatrix.tx, rootMatrix.ty);
                context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            }
            else {
                context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            }
            context.beginPath();
            context.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
            context.clip();
            if (rootMatrix) {
                context.setTransform(rootMatrix.a, rootMatrix.b, rootMatrix.c, rootMatrix.d, rootMatrix.tx, rootMatrix.ty);
            }
            drawCalls += this.drawDisplayObject(displayObject, context, rootMatrix);
            context.restore();
            egret.sys.Region.release(region);
            return drawCalls;
        };
        p.createRenderContext = function (width, height) {
            var surface = egret.sys.surfaceFactory.create(true);
            if (!surface) {
                return null;
            }
            surface.width = Math.max(257, width);
            surface.height = Math.max(257, height);
            return surface.renderContext;
        };
        p.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.rootDisplayList) {
                egret.sys.DisplayList.release(this.rootDisplayList);
                this.rootDisplayList = null;
            }
            if (this.context) {
                egret.sys.surfaceFactory.release(this.context.surface);
            }
        };
        return MyRenderTexture;
    })(egret.Texture);
    egret.MyRenderTexture = MyRenderTexture;
    egret.registerClass(MyRenderTexture,"egret.MyRenderTexture");
})(egret || (egret = {}));
