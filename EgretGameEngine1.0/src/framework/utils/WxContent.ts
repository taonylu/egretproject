/**
 * 微信接口
 * @author chenkai & liaotianzi
 * @date 2017/1/5
 * 
 * Example:
 * App.WxContent.configWx();
 * App.WxContent.setTitle("这是一个重新设置的分享标题");
 * 
 */ 
class WxContent extends SingleClass{
    /**是否已配置*/
    public isConfig:boolean = false;
    /**后台地址*/
    private serverUrl: string = "http://h5pf.xykjg.com/gamesServer/wx/getSignature";
    /**分享标题*/
    public title = "洁净之旅";
    /**分享描述*/
    private desc = "体验蓝月亮洁净之旅享受科学洗衣";
    /**分享连接*/
    private link = "http://h5.xykjg.com/CleanJourney/?_campaign=CleanJourney&_adTag=prd";
    /**分享图片*/
    private imgUrl = "http://h5.xykjg.com/CleanJourney/resource/assets/wx/wx.png";
    
    /**是否在微信浏览器中打开*/
    public isWx(): boolean {
        let ua: string = navigator.userAgent.toLowerCase();
        if(/micromessenger/.test(ua)) {
            return true;
        }
        return false;
    }
    
    /**配置微信*/
    public configWx(): void {
        if(this.isWx() == false) {
            return;
        }
        //中控服务器地址
        let data = JSON.stringify({ "url": window.location.href });
        App.Http.initServerUrl(this.serverUrl);
        App.Http.send(data,this.toConfig, this);
    }
    
    /**配置文件*/
    private toConfig(ret) {
        egret.log("get wx config:", ret);
        //body配置
        var bodyConfig: BodyConfig = new BodyConfig();
        bodyConfig.debug = false;
        bodyConfig.appId = ret.appId;
        bodyConfig.timestamp = ret.timestamp;
        bodyConfig.nonceStr = ret.nonceStr;
        bodyConfig.signature = ret.signature;
        bodyConfig.jsApiList = ["onMenuShareTimeline","BodyMenuShareAppMessage",'onMenuShareQQ','onMenuShareWeibo'];
        
        if(wx) {
            // 通过config接口注入权限验证配置
            wx.config(bodyConfig);
            //接口验证成功
            wx.ready(function() {
                App.WxContent.isConfig = true;
                App.WxContent.setTile(App.WxContent.title);
            });
        }
    }
    
    /**
     * 设置分享
     * @title 标题
     */ 
    public setTile(title:string){
        if(this.isConfig == false) {
            return;
        }
        //分享朋友圈
        var body: BodyMenuShareTimeline = new BodyMenuShareTimeline();
        body.title = title;
        body.imgUrl = this.imgUrl;
        body.link = this.link;
        body.success = function() {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
        }
        wx.onMenuShareTimeline(body);
                
        //分享好友
        var bodyFriend: BodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyFriend.title = title;
        bodyFriend.imgUrl = this.imgUrl;
        bodyFriend.link = this.link;
        bodyFriend.desc = this.desc;
        bodyFriend.success = function() {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
        }
        wx.onMenuShareAppMessage(bodyFriend);
        
        //分享QQ
        var bodyQQ:BodyMenuShareQQ = new BodyMenuShareQQ();
        bodyQQ.title = title;
        bodyQQ.imgUrl = this.imgUrl;
        bodyQQ.link = this.link;
        bodyQQ.desc = this.desc;
        bodyQQ.success = function(){
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
        }
        wx.onMenuShareQQ(bodyQQ);
        
        //分享腾讯微博
        var bodyWeiBo:BodyMenuShareWeibo = new BodyMenuShareWeibo();
        bodyWeiBo.title = title;
        bodyWeiBo.imgUrl = this.imgUrl;
        bodyWeiBo.link = this.link;
        bodyWeiBo.desc = this.desc;
        bodyWeiBo.success = function(){
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
        }
        wx.onMenuShareWeibo(bodyWeiBo);
    }

}












