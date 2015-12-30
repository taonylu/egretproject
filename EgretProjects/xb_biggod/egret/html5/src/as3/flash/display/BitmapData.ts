/**
 * Created by mengj_000 on 2015/4/27.
 */


module flash
{

        export class BitmapData extends egret.RenderTexture
        {

            private static shape:egret.Shape = new egret.Shape();

            private static renderTexture:egret.RenderTexture = new egret.RenderTexture();

            private $transparent:boolean;
            public get transparent():boolean
            {
                return this.$transparent;
            }

            constructor(width:number, height:number, transparent:boolean = true, fillColor:number = 0xFFFFFFFF,txt?:egret.Texture) {
                super();
                if(txt){
                    this._setBitmapData(txt._bitmapData);
                    this.init();
                    this.setSize(txt._textureWidth, txt._textureHeight);
                    this._drawImage(txt, 0, 0, txt._textureWidth, txt._textureHeight, 0, 0, txt._textureWidth, txt._textureHeight);
                }
                else {
                    var graphics:egret.Graphics = BitmapData.shape.graphics;
                    var alpha:number;
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


            public initWidthTexture(width:number, height:number, transparent?:boolean, fillColor?:number,txt?:egret.Texture)
            {
                if(txt){
                    this._setBitmapData(txt._bitmapData);
                    this.init();
                    this.setSize(txt._textureWidth, txt._textureHeight);
                    this._drawImage(txt, 0, 0, txt._textureWidth, txt._textureHeight, 0, 0, txt._textureWidth, txt._textureHeight);
                }
                else {
                    var graphics:egret.Graphics = BitmapData.shape.graphics;
                    var alpha:number;
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


            /**
             * 设置 BitmapData 对象的单个像素。
             * @method as3.BitmapData#setPixel
             */
            public setPixel(x:number, y:number, color:number):void {
                this._fill(x, y, 1, 1, color, false, false);
            }

            //public setPixel32(x:number, y:number, color:number):void {
            //    this._fill(x, y, 1, 1, color);
            //}

            private $rect:egret.Rectangle;
            public get rect():egret.Rectangle
            {
                if(this.$rect == null)
                    this.$rect = new egret.Rectangle();

                this.$rect.width = this.textureWidth;
                this.$rect.height = this.textureHeight;

                return this.$rect;
            }

            private _fill(x:number, y:number, width:number, height:number, color:number, clear:boolean = false, hasAlpha:boolean = true):void {
                var graphics:egret.Graphics = BitmapData.shape.graphics;
                var alpha:number;
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
                    //todo 清除掉这块区域
                    //renderContext.clearRect(x, y, width, height);
                }
                this._drawImage(BitmapData.renderTexture, 0, 0, width, height, x, y, width, height);
            }

            /**
             * 位图图像的宽度，以像素为单位。
             * @member {number} as3.BitmapData#width
             */
            public get width():number {
                return this._textureWidth;
            }

            /**
             * 位图图像的高度，以像素为单位。
             * @member {number} as3.BitmapData#height
             */
            public get height():number {
                return this._textureHeight;
            }

            /**
             * 为没有拉伸、旋转或色彩效果的图像之间的像素处理提供一个快速例程。此方法在目标 BitmapData 对象的目标点将源图像的矩形区域复制为同样大小的矩形区域。
             * @method as3.BitmapData#copyPixels
             * @param sourceBitmapData {as3.BitmapData} 要从中复制像素的输入位图图像。源图像可以是另一个 BitmapData 实例，也可以指当前 BitmapData 实例。
             * @param sourceRect {egret.Rectangle} 定义要用作输入的源图像区域的矩形。
             * @param destPoint {egret.Point} 目标点，它表示将在其中放置新像素的矩形区域的左上角。
             */
            public copyPixels(sourceBitmapData:BitmapData, sourceRect:egret.Rectangle, destPoint:egret.Point, alphaBitmapData:BitmapData = null, alphaPoint:egret.Point = null, mergeAlpha:boolean = false):void {
                this._drawImage(sourceBitmapData, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destPoint.x, destPoint.y, sourceRect.width, sourceRect.height);
            }

            private _drawImage(texture:egret.Texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight):void {
                var context:egret.RendererContext = this.renderContext;
                this.begin();
                if(context["gl"]) {
                    context = this["canvasContext"];
                    context.drawImage(texture._bitmapData, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

                }
                else {
                    context.drawImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
                }
                this.end();
            }

            public clone():BitmapData
            {
                var rect:Rectangle = new Rectangle(0, 0, this.width, this.height);
                var pt:egret.Point = new egret.Point(0, 0);
                var b:BitmapData = new flash.BitmapData(this.width,this.height);

                b.copyPixels(this,rect,pt);

                return b;
            }

            private $lock:boolean = false;

            public lock():void {
                this.$lock = true;
            }

            public unlock(changeRect:egret.Rectangle = null):void {
                this.$lock = false;
            }

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
            public draw2(source:egret.DisplayObject, matrix:egret.Matrix = null, colorTransform:any = null, blendMode:string = null, clipRect:egret.Rectangle = null, smoothing:boolean = false):void{
                if(!clipRect){
                    clipRect = new egret.Rectangle(0,0,source.width, source.height);
                }
                this.drawToTexture(source,clipRect,1);
            }
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
            public drawWithQuality2(source:egret.DisplayObject, matrix:egret.Matrix = null, colorTransform:any = null, blendMode:string = null, clipRect:egret.Rectangle = null, smoothing:boolean = false,quality:string = null):void{
                this.draw2(source, matrix,colorTransform, blendMode, clipRect, smoothing);
            }

        }
}