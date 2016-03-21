/**
 * 微信接口
 * @author 
 *
 //微信分享
	var weixinCongif = {
		"debug":true,
		"appId":'<?= $js_sign['appId']; ?>',
		"timestamp":<?= $js_sign['timestamp']; ?>,
		"nonceStr":'<?= $js_sign['nonceStr']; ?>',
		"signature":'<?= $js_sign['signature']; ?>',
		"title":"",
		"desc":"",
		"link":"",
		"imgUrl":""
	} 
 */

class WeiXin {
	
    public static start() {
        //配置微信
        var bodyConfig: BodyConfig = new BodyConfig();
        var weixin = window["weixinConfig"];
        bodyConfig.debug = weixin.debug;
        bodyConfig.appId = weixin.appId;
        bodyConfig.timestamp = weixin.timestamp;
        bodyConfig.nonceStr = weixin.nonceStr;
        bodyConfig.signature = weixin.signature; 
        bodyConfig.jsApiList = ["onMenuShareTimeline","BodyMenuShareAppMessage"];
        if(wx) {
            // 通过config接口注入权限验证配置
            wx.config(bodyConfig);
            
            //接口验证失败
            wx.error(function() {
                egret.log("接口验证失败");
            });
            
            //接口验证成功
            wx.ready(function() {
                //分享朋友圈
                var body: BodyMenuShareTimeline = new BodyMenuShareTimeline();
                wx.onMenuShareTimeline(body);
                body.title = weixin.title;
                body.imgUrl = weixin.imgUrl;
                body.link = weixin.link;
                body.success = function() {

                }

                //分享好友
                var bodyFriend: BodyMenuShareAppMessage = new BodyMenuShareAppMessage();
                wx.onMenuShareAppMessage(bodyFriend);
                bodyFriend.title = weixin.title;
                bodyFriend.imgUrl = weixin.imgUrl;
                bodyFriend.link = weixin.link;
                bodyFriend.desc = weixin.desc;
                bodyFriend.success = function() {
                    egret.log("分享好友");
                }
            });
        }
    }
}
