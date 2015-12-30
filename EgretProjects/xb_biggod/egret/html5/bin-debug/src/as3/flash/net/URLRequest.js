/**
 * Created by huitao on 2015/5/11.
 */
var flash;
(function (flash) {
    var URLRequest = (function (_super) {
        __extends(URLRequest, _super);
        function URLRequest(_url) {
            _super.call(this, _url);
        }
        var __egretProto__ = URLRequest.prototype;
        return URLRequest;
    })(egret.URLRequest);
    flash.URLRequest = URLRequest;
    URLRequest.prototype.__class__ = "flash.URLRequest";
})(flash || (flash = {}));
