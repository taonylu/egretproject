/**
 * Http请求类
 * 序列发送http请求
 * @author chenkai
 * @date 2016/12/18
 */
var Http = (function (_super) {
    __extends(Http, _super);
    function Http() {
        _super.call(this);
        /**请求格式POST or GET*/
        this.httpMethod = egret.HttpMethod.POST;
        /**发送缓存*/
        this.cacheList = [];
        /**请求状态*/
        this.requesting = false;
        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
    }
    var d = __define,c=Http,p=c.prototype;
    /**
     * 初始化http访问地址
     * @serverUrl 访问地址
     */
    p.initServerUrl = function (serverUrl) {
        this.serverUrl = serverUrl;
    };
    /**
     * 发送
     * @msg 消息字符串 一般为json格式
     * @callBack 回调
     * @thisObject 回调执行对象
     */
    p.send = function (msg, callBack, thisObject) {
        this.cacheList.push([msg, callBack, thisObject]);
        this.next();
    };
    /**发送下一条*/
    p.next = function () {
        if (this.requesting) {
            return;
        }
        if (this.cacheList.length == 0) {
            return;
        }
        this.curSend = this.cacheList.shift();
        this.request.open(this.serverUrl, this.httpMethod);
        this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //this.request.setRequestHeader("Content-Type","application/json");
        this.request.send(this.curSend[0]);
        this.requesting = true;
    };
    /**发送完成*/
    p.onPostComplete = function (e) {
        if (this.curSend) {
            this.curSend[1].call(this.curSend[2], this.request.response);
        }
        this.requesting = false;
        this.next();
    };
    /**发送失败*/
    p.onPostIOError = function (e) {
        console.error("Http send error");
        this.requesting = false;
        this.next();
    };
    /**删除所有请求*/
    p.clearAllRequest = function () {
        this.request.abort();
        this.curSend = null;
        this.cacheList.length = 0;
    };
    return Http;
}(SingleClass));
egret.registerClass(Http,'Http');
