/**
 * 微信接口
 * @author chenkai & liaotianzi
 * @date 2017/1/5
 */
var WxContent = (function (_super) {
    __extends(WxContent, _super);
    function WxContent() {
        _super.apply(this, arguments);
        /**是否已配置*/
        this.isConfig = false;
        /**后台地址*/
        this.serverUrl = "http://h5pf.xykjg.com/gamesServer/wx/getSignature";
    }
    var d = __define,c=WxContent,p=c.prototype;
    /**是否在微信浏览器中打开*/
    p.isWx = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (/micromessenger/.test(ua)) {
            return true;
        }
        return false;
    };
    /**配置微信*/
    p.configWx = function () {
        if (this.isWx() == false) {
            return;
        }
        //中控服务器地址
        var data = JSON.stringify({ "url": window.location.href });
        App.Http.initServerUrl(this.serverUrl);
        App.Http.send(data, this.toConfig, this);
    };
    /**配置文件*/
    p.toConfig = function (ret) {
        egret.log(ret);
        window["wxConfig"](ret.appId, ret.timestamp, ret.nonceStr, ret.signature);
    };
    /**
     * 设置分享
     * @title 标题
     */
    p.setShare = function (title) {
        if (this.isConfig == false) {
            return;
        }
        window['setShareContent'](title);
    };
    return WxContent;
}(SingleClass));
egret.registerClass(WxContent,'WxContent');
