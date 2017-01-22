/**
 * 微信接口
 * @author chenkai & liaotianzi
 * @date 2017/1/5
 */ 
class WxContent extends SingleClass{
    /**是否已配置*/
    public isConfig:boolean = false;
    /**后台地址*/
    private serverUrl: string = "http://h5pf.xykjg.com/gamesServer/wx/getSignature";
    
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
        window["wxConfig"](ret.appId,ret.timestamp,ret.nonceStr,ret.signature);
    }
    
    /**
     * 设置分享
     * @title 标题
     */ 
    public setShare(title:string){
        if(this.isConfig == false) {
            return;
        }
        window['setShareContent'](title);
    }

}












