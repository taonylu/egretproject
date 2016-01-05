/**
 * 一个Http请求
 * @author
 *
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
    p.destroy = function () {
        this.completeHandler = null;
        this.errorHandler = null;
        this.request.removeEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        this.request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
    };
    return HttpUtil;
})();
egret.registerClass(HttpUtil,'HttpUtil');
