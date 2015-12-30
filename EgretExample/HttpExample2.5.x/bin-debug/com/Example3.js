/**
 *
 * @author
 *
 */
var Example3 = (function () {
    function Example3() {
        var json = {
            "name": "peter"
        };
        this.urlloader = new egret.URLLoader();
        this.urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var urlreq = new egret.URLRequest();
        urlreq.method = egret.URLRequestMethod.POST;
        urlreq.url = "http://egret5.sinaapp.com/Example/HttpExample/json.php";
        urlreq.data = json; //携带参数
        this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
        this.urlloader.load(urlreq);
    }
    var d = __define,c=Example3;p=c.prototype;
    //返回值
    p.onComplete = function (event) {
        console.log(this.urlloader.data);
    };
    p.onError = function (e) {
        console.log("加载错误");
    };
    return Example3;
})();
egret.registerClass(Example3,"Example3");
