/**
 * 一个Http请求
 * @author
 *
 */
/**
 * 范例
  var http:HttpUtil = new HttpUtil();
  http.completeHandler = this.completeHandler;
  http.errorHandler = this.errorHandler;
  
  //GET
  var url: string = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/xbLottery" + "/pass/" + pass;
  var msg: string = "";
  http.send(url,egret.HttpMethod.GET,msg, this);
  
  //POST
  var url: string = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/xbLottery" + "/pass/" + pass;
  var msg: string = "p1=postP1&p2=postP2";
  http.send(url,egret.HttpMethod.POST,msg, this);
 */
var HttpUtil = (function () {
    function HttpUtil() {
        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
    }
    var d = __define,c=HttpUtil,p=c.prototype;
    p.send = function (url, httpMethod, msg, obj) {
        this.thisObject = obj;
        this.request.open(url, httpMethod);
        this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (msg != "") {
            this.request.send(msg);
        }
        else {
            this.request.send();
        }
    };
    p.onPostComplete = function (e) {
        if (this.completeHandler) {
            this.completeHandler.call(this.thisObject, this.request.response);
        }
    };
    p.onPostIOError = function (e) {
        if (this.errorHandler) {
            this.errorHandler.call(this.thisObject, e);
        }
    };
    return HttpUtil;
}());
egret.registerClass(HttpUtil,'HttpUtil');
