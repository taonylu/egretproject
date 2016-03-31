/**
*  文 件 名：CImageLoader.ts
*  功    能：自定义图片加载类
*  内    容：
*  作    者：Rikimaru
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*  Example:
    var imageLoader:CImageLoader = new CImageLoader();
    imageLoader.load(url,100,100,doc);
    imageLoader.clear();
*/
var CImageLoader = (function () {
    function CImageLoader() {
        this.loader = new egret.ImageLoader(); //加载器
        this.width = 0;
        this.height = 0;
    }
    var d = __define,c=CImageLoader,p=c.prototype;
    /**
     * 加载
     * @param url 图片链接
     * @param width 图片宽
     * @param height 图片高
     * @param doc 显示容器
     */
    p.load = function (url, width, height, doc) {
        this.doc = doc;
        this.width = width;
        this.height = height;
        this.loader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        this.loader.load(url);
    };
    p.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        var bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.width = this.width;
        bitmap.height = this.height;
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
