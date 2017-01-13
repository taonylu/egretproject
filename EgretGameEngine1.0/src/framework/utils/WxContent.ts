/**
 * 微信接口
 * @author chenkai & liaotianzi
 * @date 2017/1/5
 */ 
class WxContent extends SingleClass{
    /**是否已配置*/
    private isConfig:boolean = false;
    /**后台地址*/
    //private serverUrl:string = "http://192.168.241.7:8082/gamesServer/wx/getSignature";
    private serverUrl: string = "http://h5test.xykjg.com:8081/gamesServer/wx/getSignature";
    
    /**默认标题*/
    public title: string = "洁净之旅";
    /**默认描述*/
    public desc: string = "体验蓝月亮洁净之旅享受科学洗衣";
    /**默认链接*/
    public link: string = "http://h5.xykjg.com/CleanJourney?_campaign=CleanJourney&_adTag=test";
    /**默认图片链接*/
    public imgUrl: string = "http://h5.xykjg.com/CleanJourney/resource/assets/wx/wx.png";
    
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
        egret.log(ret);
        
        let aa: BodyConfig = new BodyConfig();
        aa.debug = false; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        aa.appId = ret.appId; // 必填，公众号的唯一标识
        aa.timestamp = ret.timestamp; // 必填，生成签名的时间戳
        aa.nonceStr = ret.nonceStr; // 必填，生成签名的随机串
        aa.signature = ret.signature;// 必填，签名，见附录1
        aa.jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ']; // 必需要使用的JS接口列表，所有JS接口列表见附录2
        if(wx) {
            wx.config(aa);
        }
        wx.error(function(error) {
            egret.log('config error',error);
        });
        wx.ready(function() {
            egret.log('config success');
            App.WxContent.isConfig = true;
            App.WxContent.setShare(App.WxContent.title);
        });
    }
    
    /**
     * 设置分享
     * @title 标题
     */ 
    public setShare(title:string){
        if(this.isConfig == false) {
            return;
        }
        App.WxContent.sharePengYou(title);
        App.WxContent.sharePengYouQuan(title);
        App.WxContent.shareQQ(title);
    }
    
    /**
     * 分享朋友
     * @title 标题
     */ 
    public sharePengYou(title: string): void {
        let aa = new BodyMenuShareAppMessage();
        aa.title = title;
        aa.desc = this.desc;
        aa.link = this.link;
        aa.imgUrl = this.imgUrl;
        aa.success = function(res) {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
            egret.log('share pengyou success',res)
        }
        wx.onMenuShareAppMessage(aa);
    }
    
    /**
     * 分享朋友圈
     * @title 标题
     */ 
    public sharePengYouQuan(title: string): void {
        let aa = new BodyMenuShareTimeline();
        aa.title = title;
        aa.link = this.link;
        aa.imgUrl = this.imgUrl;
        aa.success = function(res) {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
            egret.log('share pengyouquan success',res);
        }
        wx.onMenuShareTimeline(aa);
    }
    
    /**
     * 分享到手机QQ
     * @title 标题
     */ 
    public shareQQ(title:string){
        let aa = new BodyMenuShareQQ();
        aa.title = title;
        aa.link = this.link;
        aa.imgUrl = this.imgUrl;
        aa.desc = this.desc;
        aa.success = function(res) {
            App.BluemoonSDK.tracking(BluemoonSDK.SHARE_GAME);
            egret.log('share qq success',res);
        }
        wx.onMenuShareQQ(aa);
    }
    
}












