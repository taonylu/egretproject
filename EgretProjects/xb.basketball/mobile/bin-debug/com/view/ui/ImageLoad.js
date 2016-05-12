var ImageLoad = (function (_super) {
    __extends(ImageLoad, _super);
    function ImageLoad() {
        _super.call(this);
        this.imageLoader = new egret.ImageLoader(); //图片加载器
        this.img = new egret.Bitmap();
        this.addChild(this.img);
    }
    var d = __define,c=ImageLoad,p=c.prototype;
    p.loadImg = function (imgUrl) {
        this.clear();
        if (imgUrl == "" || imgUrl == null) {
            return;
        }
        this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        this.imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        this.imageLoader.load(imgUrl);
    };
    //加载完成
    p.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        this.img.bitmapData = imageLoader.data;
        //正中心对齐
        if (this.parent) {
            this.img.x = (this.parent.width - this.img.width) / 2;
            this.img.y = (this.parent.height - this.img.height) / 2;
        }
    };
    //加载头像错误
    p.onLoadError = function () {
        egret.log("加载图片错误");
    };
    //是否为空
    p.isEmpty = function () {
        if (this.img.bitmapData == null) {
            return true;
        }
        return false;
    };
    //清理数据
    p.clear = function () {
        this.img.bitmapData = null;
    };
    return ImageLoad;
}(egret.DisplayObjectContainer));
egret.registerClass(ImageLoad,'ImageLoad');
