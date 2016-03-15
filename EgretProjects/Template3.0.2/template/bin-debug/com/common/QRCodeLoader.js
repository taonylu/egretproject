/**
*  文 件 名：QRCodeLoader.ts
*  功    能：二维码加载器
*  内    容：
*  作    者： Rikiamru
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*
* Example:
    index.html:
    <div id="code" style="display:none"></div>
    
    <script>
        var srvConfig = {
            host : '<%= host %>',
            port : '<%= port %>',
            rid : '<%= rid %>'
        }
        var codeUrl =  "http://"+srvConfig.host+":"+srvConfig.port+ "/mobile?rid=" + srvConfig.rid;
        var codeWidth = 350;
        var codeHeight = 350;
        var logoUrl = "";
        $("#code").qrcode({ width: codeWidth, height:codeHeight,text:codeUrl });
        var i=$("#code > canvas");
        var codeData=i[0].toDataURL();
        window["dataUrl"] = codeData;
        window["codeWidth"] = codeWidth;
        window["codeHeight"] = codeHeight;
        window["logoUrl"] = logoUrl;
    </script>
    
    TS:
    var codeLoader:QRCodeLoader = new QRCodeLoader();
    codeLoader.load(window["dataUrl"], window["codeWidth"],window["codeHeight"], window["logoUrl"]);
    this.addChild(codeLoader);
 */
var QRCodeLoader = (function (_super) {
    __extends(QRCodeLoader, _super);
    function QRCodeLoader() {
        _super.apply(this, arguments);
        this.logoUrl = ""; //logo地址
    }
    var d = __define,c=QRCodeLoader,p=c.prototype;
    /**
     * @dataUrl 二维码地址  (由jQuery.code.js生成的canvas.toDataUrl，从index.html生成，由window传递进TS)
     * @icon 二维码logo图片地址
     */
    p.load = function (dataUrl, width, height, logoUrl) {
        if (logoUrl === void 0) { logoUrl = ""; }
        this.qrcodeWidth = width;
        this.qrcodeHeight = height;
        this.logoUrl = logoUrl;
        var imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.onQRCodeComplete, this);
        imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onQRCodeError, this);
        imageLoader.load(dataUrl);
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
    //销毁二维码
    p.destroy = function () {
        var len = this.numChildren;
        for (var i = len - 1; i >= 0; i--) {
            var obj = this.getChildAt(i);
            obj.parent && obj.parent.removeChild(obj);
        }
    };
    return QRCodeLoader;
})(egret.DisplayObjectContainer);
egret.registerClass(QRCodeLoader,'QRCodeLoader');
