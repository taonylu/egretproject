var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 微信接口
 * @author chenkai & liaotianzi
 * @date 2017/1/5
 *
 * Example:
 * //配置微信
 * App.WxContent.configWx();
 *
 * //游戏有得分后，重新设置分享标题
 * App.WxContent.setTitle("这是一个重新设置的分享标题");
 *
 */
var WxContent = (function (_super) {
    __extends(WxContent, _super);
    function WxContent() {
        var _this = _super.apply(this, arguments) || this;
        /**是否已配置*/
        _this.isConfig = false;
        /**后台地址*/
        _this.serverUrl = "http://h5pf.xykjg.com/gamesServer/wx/getSignature";
        /**分享标题*/
        _this.title = "洁净之旅";
        /**分享描述*/
        _this.desc = "体验蓝月亮洁净之旅享受科学洗衣";
        /**分享连接*/
        _this.link = "http://h5.xykjg.com/CleanJourney/?_campaign=CleanJourney&_adTag=prd";
        /**分享图片*/
        _this.imgUrl = "http://h5.xykjg.com/CleanJourney/resource/assets/wx/wx.png";
        return _this;
    }
    /**是否在微信浏览器中打开*/
    WxContent.prototype.isWx = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (/micromessenger/.test(ua)) {
            return true;
        }
        return false;
    };
    /**配置微信*/
    WxContent.prototype.configWx = function () {
        if (this.isWx() == false) {
            return;
        }
        //中控服务器地址
        var data = JSON.stringify({ "url": window.location.href });
        App.Http.initServerUrl(this.serverUrl);
        App.Http.send(data, this.toConfig, this);
    };
    /**配置文件*/
    WxContent.prototype.toConfig = function (ret) {
        egret.log("get wx config:", ret);
        //body配置
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = false;
        bodyConfig.appId = ret.appId;
        bodyConfig.timestamp = ret.timestamp;
        bodyConfig.nonceStr = ret.nonceStr;
        bodyConfig.signature = ret.signature;
        bodyConfig.jsApiList = ["onMenuShareTimeline", "BodyMenuShareAppMessage", 'onMenuShareQQ', 'onMenuShareWeibo'];
        if (wx) {
            // 通过config接口注入权限验证配置
            wx.config(bodyConfig);
            //接口验证成功
            wx.ready(function () {
                App.WxContent.isConfig = true;
                App.WxContent.setTile(App.WxContent.title);
            });
        }
    };
    /**
     * 设置分享
     * @title 标题
     */
    WxContent.prototype.setTile = function (title) {
        if (this.isConfig == false) {
            return;
        }
        //分享朋友圈
        var body = new BodyMenuShareTimeline();
        body.title = title;
        body.imgUrl = this.imgUrl;
        body.link = this.link;
        body.success = function () {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
        };
        wx.onMenuShareTimeline(body);
        //分享好友
        var bodyFriend = new BodyMenuShareAppMessage();
        bodyFriend.title = title;
        bodyFriend.imgUrl = this.imgUrl;
        bodyFriend.link = this.link;
        bodyFriend.desc = this.desc;
        bodyFriend.success = function () {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
        };
        wx.onMenuShareAppMessage(bodyFriend);
        //分享QQ
        var bodyQQ = new BodyMenuShareQQ();
        bodyQQ.title = title;
        bodyQQ.imgUrl = this.imgUrl;
        bodyQQ.link = this.link;
        bodyQQ.desc = this.desc;
        bodyQQ.success = function () {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
        };
        wx.onMenuShareQQ(bodyQQ);
        //分享腾讯微博
        var bodyWeiBo = new BodyMenuShareWeibo();
        bodyWeiBo.title = title;
        bodyWeiBo.imgUrl = this.imgUrl;
        bodyWeiBo.link = this.link;
        bodyWeiBo.desc = this.desc;
        bodyWeiBo.success = function () {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
        };
        wx.onMenuShareWeibo(bodyWeiBo);
    };
    return WxContent;
}(SingleClass));
__reflect(WxContent.prototype, "WxContent");
//# sourceMappingURL=WxContent.js.map