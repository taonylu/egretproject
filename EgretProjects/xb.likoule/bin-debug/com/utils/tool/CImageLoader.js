/**
 * 自定义图片加载类
 * @author
 *
 */
var CImageLoader = (function () {
    function CImageLoader() {
        this.loader = new egret.ImageLoader();
    }
    var d = __define,c=CImageLoader,p=c.prototype;
    p.load = function (url) {
        this.loader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        this.loader.load(url);
    };
    p.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        var bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.width = 60;
        bitmap.height = 60;
        this.doc.addChild(bitmap);
    };
    p.onLoadError = function () {
        alert("加载头像错误");
    };
    p.clear = function () {
        if (this.doc && this.doc.numChildren > 0) {
            this.doc.removeChildAt(0);
        }
    };
    return CImageLoader;
}());
egret.registerClass(CImageLoader,'CImageLoader');
