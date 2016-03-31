package com.pixeltoyfactory.rube
{
    import flash.display.DisplayObjectContainer;
    import flash.display.Loader;
    import flash.display.Sprite;
    import flash.events.Event;
    import flash.events.IOErrorEvent;
    import flash.filesystem.File;
    import flash.filesystem.FileMode;
    import flash.filesystem.FileStream;
    import flash.geom.Matrix;
    import flash.net.URLRequest;
    import flash.system.Capabilities;
    import flash.system.ImageDecodingPolicy;
    import flash.system.LoaderContext;
    import flash.utils.ByteArray;
    import flash.utils.Dictionary;
    
    import Box2D.Common.Math.b2Vec2;
    import Box2D.Dynamics.b2Body;

    public class RubeRenderer extends Sprite
    {
        private var imageObjects:Array;
        private var worldScale:Number;

        private var loadedImages:Vector.<Loader>;
        private var imageObjectsByFile:Dictionary = new Dictionary();

        private var loadedNum:int = 0;
        private var readyToRender:Boolean = false;
        private var pathPrefix:String = "";

        public function RubeRenderer(stage:DisplayObjectContainer, imageObjects:Array, worldScale:Number, pathPrefix:String="")
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
			stage.addChild(this);
        }

        public function render():void
        {
            if (readyToRender == false) {
                return;
            }
            for each(var imageData:Object in imageObjects) {
                renderImage(imageData);
            }
        }

        public function renderImage(imageData:Object):void {
            var loader:Loader = Loader(imageData.loader);
            //Todo can we fix this
            if (loader.content == null) {
                return;
            }


            var ratio:Number = 1 / loader.content.height;
            ratio *= 1 * worldScale * imageData.scale;

            var matrix:Matrix = new Matrix();
            matrix.translate(-loader.content.width / 2, -loader.content.height / 2);

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

            loader.transform.matrix = matrix;
        }

        public function loadImage(imageData:Object):void {


//            var imageFilePath:String = pathPrefix + imageData.file;
//
//
//            var appDirectory:File = File.applicationDirectory;
//            var assetFile:File = appDirectory.resolvePath(imageFilePath);
//
//            var assetStream:FileStream = new FileStream();
//            imageObjectsByFile[assetStream] = imageData;
//
//            assetStream.addEventListener(IOErrorEvent.IO_ERROR, fileIoErrorHandler);
//            assetStream.addEventListener(Event.COMPLETE, fileCompleteHandler);
//            assetStream.openAsync(assetFile, FileMode.READ);
        }

        public function loadImageURL(imageData:Object):void {


            var imageFilePath:String = imageData.file;


            imageFilePath = pathPrefix + imageFilePath;
			
            var loader:Loader = new Loader();
            var loaderContext:LoaderContext = new LoaderContext();
            loaderContext.imageDecodingPolicy = ImageDecodingPolicy.ON_LOAD;

            loader.load(new URLRequest(imageFilePath), loaderContext);

            loadedImages.push(loader);
            imageData.loader = loader;
            addChild(loader);

            loadedNum++;
            if (loadedNum == imageObjects.length) {
                readyToRender = true;

                for (var i:int = imageObjects.length - 1; i >= 0; i--) {
                    imageData = imageObjects[i];
                    //todo render order
                    if (imageData.body == null) {
                        addChildAt(imageData.loader, 0);
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
//            var fileStream:FileStream = FileStream(event.currentTarget);
//
//            fileStream.removeEventListener(IOErrorEvent.IO_ERROR, fileIoErrorHandler);
//            fileStream.removeEventListener(Event.COMPLETE, fileCompleteHandler);
//
//            var imageBytes:ByteArray = new ByteArray();
//            fileStream.readBytes(imageBytes, 0, fileStream.bytesAvailable);
//            fileStream.close();
//			
//            var loader:Loader = new Loader();
//            var loaderContext:LoaderContext = new LoaderContext();
//            loaderContext.imageDecodingPolicy = ImageDecodingPolicy.ON_LOAD;
//            loader.loadBytes(imageBytes, loaderContext);
//
//            loadedImages.push(loader);
//            imageObjectsByFile[fileStream].loader = loader;
//            addChild(loader);
//
//            loadedNum++;
//            if (loadedNum == imageObjects.length) {
//                readyToRender = true;
//
//                for (var i:int = imageObjects.length - 1; i >= 0; i--) {
//                    var imageData:Object = imageObjects[i];
//                    //todo render order
//                    if (imageData.body == null) {
//                        addChildAt(imageData.loader, 0);
//                    }
//                }
//            }
        }
    }
}
