/**
 *
 * @author
 *
 */
var Example2 = (function () {
    function Example2() {
        this.urlloader = new egret.URLLoader();
        this.urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var urlreq = new egret.URLRequest();
        urlreq.method = egret.URLRequestMethod.POST;
        urlreq.url = "http://egret5.sinaapp.com/Example/HttpExample/http.php";
        urlreq.data = new egret.URLVariables("test=ok"); //携带参数
        this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
        this.urlloader.load(urlreq);
    }
    var d = __define,c=Example2;p=c.prototype;
    //返回值
    p.onComplete = function (event) {
        console.log(this.urlloader.data); //返回的是php网页
    };
    p.onError = function (e) {
        console.log("加载错误");
    };
    return Example2;
})();
egret.registerClass(Example2,"Example2");
