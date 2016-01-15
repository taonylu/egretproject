/**
 * 二维码加载器
 * @author  陈凯
 *
 使用范例
    var codeLoader:QRCodeLoader = new QRCodeLoader();
    codeLoader.load(window["qrcodeUrl"], 400,400, "http://xxxxxx.jpg");
    this.addChild(codeLoader);
 */
var QRCodeLoader = (function (_super) {
    __extends(QRCodeLoader, _super);
    function QRCodeLoader() {
        _super.apply(this, arguments);
        this.logoUrl = ""; //logo地址
    }
    var d = __define,c=QRCodeLoader;p=c.prototype;
    /**
     * @qucodeUrl 二维码地址  (由jQuery.code.js生成的canvas.toDataUrl，从index.html生成，由window传递进TS)
     * @icon 二维码logo图片地址
     */
    p.load = function (qrcodeUrl, width, height, logoUrl) {
        if (logoUrl === void 0) { logoUrl = ""; }
        this.qrcodeWidth = width;
        this.qrcodeHeight = height;
        this.logoUrl = logoUrl;
        var imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.onQRCodeComplete, this);
        imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onQRCodeError, this);
        imageLoader.load(qrcodeUrl);
    };
    p.onQRCodeError = function () {
        console.log("加载二维码错误");
    };
    //加载QRCode完成
    p.onQRCodeComplete = function (event) {
        //生成二维码
        var imageLoader = event.currentTarget;
        var bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.width = this.qrcodeWidth;
        bitmap.height = this.qrcodeHeight;
        this.addChild(bitmap);
        //加载logo
        if (this.logoUrl != "") {
            var imageLoader = new egret.ImageLoader();
            imageLoader.addEventListener(egret.Event.COMPLETE, this.onlogoComplete, this);
            imageLoader.load(this.logoUrl);
        }
    };
    //logo加载完成
    p.onlogoComplete = function (event) {
        var imageLoader = event.currentTarget;
        var bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.width = this.qrcodeWidth / 4; //  二维码高宽：logo高宽 =   4 : 1
        bitmap.height = this.qrcodeHeight / 4;
        bitmap.x = (this.qrcodeWidth - bitmap.width) / 2;
        bitmap.y = (this.qrcodeHeight - bitmap.height) / 2;
        this.addChild(bitmap);
    };
    return QRCodeLoader;
})(egret.DisplayObjectContainer);
egret.registerClass(QRCodeLoader,"QRCodeLoader");
