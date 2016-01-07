/**
 * 头像加载
 * @author
 *
 */
var HeadLoader = (function () {
    function HeadLoader() {
    }
    var d = __define,c=HeadLoader,p=c.prototype;
    p.load = function (imgUrl) {
        var imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        imageLoader.load(imgUrl);
    };
    p.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        var bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.x = this.headBg.x + 2; //调整位置
        bitmap.y = this.headBg.y + 2;
        this.userGroup.addChild(bitmap);
        this.headImgList[this.index] = bitmap; //保存头像
        this.destroy();
    };
    //加载头像错误
    p.onLoadError = function () {
        egret.log("加载头像错误");
        this.destroy();
    };
    p.destroy = function () {
        this.userGroup = null;
        this.headBg = null;
        this.headImgList = null;
    };
    return HeadLoader;
})();
egret.registerClass(HeadLoader,'HeadLoader');
