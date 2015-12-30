/**
 *
 * @author 
 *
 */
class Example2{
    
    //----------------[测试http]----------------
    //1 传递xml
    //2 接收xml
    private urlloader: egret.URLLoader;
    
    public constructor() {
        
        this.urlloader = new egret.URLLoader();
        this.urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;  
        var urlreq: egret.URLRequest = new egret.URLRequest();
        urlreq.method = egret.URLRequestMethod.POST; 
        urlreq.url = "http://egret5.sinaapp.com/Example/HttpExample/http.php";
        urlreq.data = new egret.URLVariables("test=ok");   //携带参数
        
        
        this.urlloader.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
        this.urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
        this.urlloader.load(urlreq);
    }

    //返回值
    private onComplete(event: egret.Event): void {
        console.log(this.urlloader.data);   //返回的是php网页
    }

    private onError(e: egret.IOErrorEvent): void {
        console.log("加载错误");
    }
}
