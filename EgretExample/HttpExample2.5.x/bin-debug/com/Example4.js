/**
 *
 * @author
 *
 */
var Example4 = (function () {
    //-------------------测试-------------------
    //1 新版APi，提交数据
    //2 获取返回值
    //3 结果：发送a=1成功，返回值是php网页代码，而不是特定值
    function Example4() {
        var url = "http://egret5.sinaapp.com/Example/HttpExample/http.php";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    console.log("respHandler:n", request.response);
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.log("respHandler io error");
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, null);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, null);
        request.open(url, egret.HttpMethod.POST);
        request.send("a=1");
    }
    var d = __define,c=Example4;p=c.prototype;
    return Example4;
})();
egret.registerClass(Example4,"Example4");
