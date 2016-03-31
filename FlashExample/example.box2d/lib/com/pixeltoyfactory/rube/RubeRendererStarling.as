package com.pixeltoyfactory.rube
{
    import starling.display.DisplayObjectContainer;
    import starling.display.Sprite;
    import starling.display.Image;
    import starling.display.Button;
    import starling.textures.Texture;

    import flash.display.Loader;
    import flash.display.BitmapData;

    import flash.events.Event;
    import flash.events.IOErrorEvent;

    import flash.geom.Matrix;

    import flash.net.URLRequest;

    import flash.system.Capabilities;
    import flash.system.LoaderContext;
    import flash.system.ImageDecodingPolicy;
    import flash.utils.ByteArray;
    import flash.utils.Dictionary;

    import flash.filesystem.File;
    import flash.filesystem.FileStream;
    import flash.filesystem.FileMode;

    import Box2D.Common.Math.b2Vec2;
    import Box2D.Dynamics.b2Body;

    import com.pixeltoyfactory.resources.ResourceBundle;

    public class RubeRendererStarling extends Sprite
    {
        private var imageObjects:Array;
        private var worldScale:Number;

        private var loadedImages:Vector.<Loader>;
        private var imageObjectsByFile:Dictionary = new Dictionary();

        private var loadedNum:int = 0;
        private var readyToRender:Boolean = false;
        private var pathPrefix:String = "";

        public function RubeRendererStarling(stage:DisplayObjectContainer, imageObjects:Array, worldScale:Number, pathPrefix:String="")
        {
            super();
            this.imageObjects = imageObjects;
            this.worldScale = worldScale;
            this.pathPrefix = pathPrefix;

            loadedImages = new Vector.<Loader>();

            for each(var imageData:Object in imageObjects) {
                if (Capabilities.playerType === "Desktop") {
                    loadImage(imageData);
                } else {
                    loadImageURL(imageData);
                }
            }

            addPlayButton();
        }

        private function addPlayButton():void
        {
            var buttonTexture:Texture = ResourceBundle.getTexture("PlayButton");
            var button:Button = new Button(buttonTexture);

            //button.x = (1024 - button.width) / 2;
            //button.y = (768 - button.height) / 2;

            addChild(button);
        }

        public function renderImages():void
        {
            if (readyToRender == false) {
                return;
            }
            for each(var imageData:Object in imageObjects) {
                renderImage(imageData);
            }
        }

        public function renderImage(imageData:Object):void {
            var image:Image = Image(imageData.loader);

            var ratio:Number = 1 / image.texture.height;
            ratio *= 1.0 * worldScale * imageData.scale;


            var matrix:Matrix = new Matrix();
            matrix.translate((-image.texture.width) / 2.0, ((-image.texture.height)) / 2.0);

            //Adjust image size
            matrix.scale(ratio, -ratio);

            if (imageData.angle) {
                var imageRadians:Number = imageData.angle;// * (180 / Math.PI);
                matrix.rotate(imageRadians);
            }

            //account for world scale
            matrix.scale(1/worldScale, 1/worldScale);

            //Image offset
            matrix.translate(imageData.center.x, imageData.center.y);

            if (imageData.body) {
                var bodyWithImage:b2Body = b2Body(imageData.body);

                var pos:b2Vec2 = bodyWithImage.GetPosition();
                var radians:Number = bodyWithImage.GetAngle();// * (180 / Math.PI);

                //Rotation
                matrix.rotate(radians);

                //position
                matrix.translate(pos.x, pos.y);
            }

            //undo world scale
            matrix.scale(worldScale, worldScale);

            image.transformationMatrix = matrix;
        }

        public function loadImage(imageData:Object):void {


            var imageFilePath:String = pathPrefix + imageData.file;


            var appDirectory:File = File.applicationDirectory;
            var assetFile:File = appDirectory.resolvePath(imageFilePath);

            var assetStream:FileStream = new FileStream();
            imageObjectsByFile[assetStream] = imageData;

            assetStream.addEventListener(IOErrorEvent.IO_ERROR, fileIoErrorHandler);
            assetStream.addEventListener(Event.COMPLETE, fileCompleteHandler);
            assetStream.openAsync(assetFile, FileMode.READ);
        }

        public function loadImageURL(imageData:Object):void {


            throw new Error("busted");
            var imageFilePath:String = imageData.file;


            imageFilePath = imageFilePath;

            var loader:Loader = new Loader();
            var loaderContext:LoaderContext = new LoaderContext();
            loaderContext.imageDecodingPolicy = ImageDecodingPolicy.ON_LOAD;

            trace(imageFilePath);
            loader.load(new URLRequest(imageFilePath), loaderContext);

            loadedImages.push(loader);
            imageData.loader = loader;
            //addChild(loader);

            loadedNum++;
            if (loadedNum == imageObjects.length) {
                readyToRender = true;

                for (var i:int = imageObjects.length - 1; i >= 0; i--) {
                    imageData = imageObjects[i];
                    //todo render order
                    if (imageData.body == null) {
                        //addChildAt(imageData.loader, 0);
                    }
                }
            }
        }

        private function fileIoErrorHandler(event:IOErrorEvent):void
        {
            trace("IOError", event);
        }

        private function fileCompleteHandler(event:Event):void
        {
            var fileStream:FileStream = FileStream(event.currentTarget);

            fileStream.removeEventListener(IOErrorEvent.IO_ERROR, fileIoErrorHandler);
            fileStream.removeEventListener(Event.COMPLETE, fileCompleteHandler);

            var imageBytes:ByteArray = new ByteArray();
            fileStream.readBytes(imageBytes, 0, fileStream.bytesAvailable);
            fileStream.close();

            var loader:Loader = new Loader();
            var loaderContext:LoaderContext = new LoaderContext();
            loaderContext.imageDecodingPolicy = ImageDecodingPolicy.ON_LOAD;
            loader.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE, function(event:Object):void {
                loadedImages.push(loader);
                //imageObjectsByFile[fileStream].loader = loader;

                var bitmapData:BitmapData = new BitmapData(loader.content.width, loader.content.height, true, 0x00000000);
                bitmapData.draw(loader);

                var texture:Texture = Texture.fromBitmapData(bitmapData);

                var image:Image = new Image(texture);
                //TODO
                imageObjectsByFile[fileStream].loader = image;

                image.x = 300;
                addChild(image);

                loadedNum++;
                if (loadedNum == imageObjects.length) {
                    readyToRender = true;

                    for (var i:int = imageObjects.length - 1; i >= 0; i--) {
                        var imageData:Object = imageObjects[i];
                        //todo render order
                        if (imageData.body == null) {
                            //addChildAt(imageData.loader, 0);
                        }
                    }
                }
                });

            loader.loadBytes(imageBytes, loaderContext);

        }
    }
}
