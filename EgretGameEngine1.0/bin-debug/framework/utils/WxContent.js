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
        //private serverUrl:string = "http://192.168.241.7:8082/gamesServer/wx/getSignature";
        this.serverUrl = "http://h5test.xykjg.com:8081/gamesServer/wx/getSignature";
        /**默认标题*/
        this.title = "洁净之旅";
        /**默认描述*/
        this.desc = "体验蓝月亮洁净之旅享受科学洗衣";
        /**默认链接*/
        this.link = "http://h5.xykjg.com/CleanJourney?_campaign=CleanJourney&_adTag=test";
        /**默认图片链接*/
        this.imgUrl = "http://h5.xykjg.com/CleanJourney/resource/assets/wx/wx.png";
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
        var aa = new BodyConfig();
        aa.debug = false; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        aa.appId = ret.appId; // 必填，公众号的唯一标识
        aa.timestamp = ret.timestamp; // 必填，生成签名的时间戳
        aa.nonceStr = ret.nonceStr; // 必填，生成签名的随机串
        aa.signature = ret.signature; // 必填，签名，见附录1
        aa.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ']; // 必需要使用的JS接口列表，所有JS接口列表见附录2
        if (wx) {
            wx.config(aa);
        }
        wx.error(function (error) {
            egret.log('config error', error);
        });
        wx.ready(function () {
            egret.log('config success');
            App.WxContent.isConfig = true;
            App.WxContent.setShare(App.WxContent.title);
        });
    };
    /**
     * 设置分享
     * @title 标题
     */
    p.setShare = function (title) {
        if (this.isConfig == false) {
            return;
        }
        App.WxContent.sharePengYou(title);
        App.WxContent.sharePengYouQuan(title);
        App.WxContent.shareQQ(title);
    };
    /**
     * 分享朋友
     * @title 标题
     */
    p.sharePengYou = function (title) {
        var aa = new BodyMenuShareAppMessage();
        aa.title = title;
        aa.desc = this.desc;
        aa.link = this.link;
        aa.imgUrl = this.imgUrl;
        aa.success = function (res) {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
            egret.log('share pengyou success', res);
        };
        wx.onMenuShareAppMessage(aa);
    };
    /**
     * 分享朋友圈
     * @title 标题
     */
    p.sharePengYouQuan = function (title) {
        var aa = new BodyMenuShareTimeline();
        aa.title = title;
        aa.link = this.link;
        aa.imgUrl = this.imgUrl;
        aa.success = function (res) {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
            egret.log('share pengyouquan success', res);
        };
        wx.onMenuShareTimeline(aa);
    };
    /**
     * 分享到手机QQ
     * @title 标题
     */
    p.shareQQ = function (title) {
        var aa = new BodyMenuShareQQ();
        aa.title = title;
        aa.link = this.link;
        aa.imgUrl = this.imgUrl;
        aa.desc = this.desc;
        aa.success = function (res) {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
            egret.log('share qq success', res);
        };
        wx.onMenuShareQQ(aa);
    };
    return WxContent;
}(SingleClass));
egret.registerClass(WxContent,'WxContent');
