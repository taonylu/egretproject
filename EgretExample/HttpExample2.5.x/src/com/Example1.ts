/**
 *
 * @author 
 *
 */
class Example1 {
    
     //----------------[测试http]----------------
    //测试内容
    //1. 加载时不同的数据格式
    //2.  GET和POST请求方法
    //3.  发送带参数请求
    
    private urlloader: egret.URLLoader;
	public constructor() {
        this.urlloader = new egret.URLLoader();
        
        //--------------加载时，不同的数据格式-------------
        //this.urlloader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;  
        //this.urlloader.dataFormat = egret.URLLoaderDataFormat.BINARY;
        //this.urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //this.urlloader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        //this.urlloader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        
        var urlreq: egret.URLRequest = new egret.URLRequest();
        
        //head  
        //var head: egret.URLRequestHeader = new egret.URLRequestHeader("Access-Control-Allow-Origin","*");
        //urlreq.requestHeaders.push(head);
        
        //------------加载时，不同的请求方法----------------
        //urlreq.method = egret.URLRequestMethod.GET;    
        urlreq.method = egret.URLRequestMethod.POST; 
        
        //------------访问网站，传递参数------------------
        urlreq.url = "http://egret5.sinaapp.com/Example/HttpExample/http.php";
        urlreq.data = new egret.URLVariables("test=ok");   //携带参数
        
        //-----------dataFormat为TEXTURE时，加载图片--------------------------
        //var request: egret.URLRequest = new egret.URLRequest("resource/assets/egret_icon.png");
        
        
        
        this.urlloader.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
        this.urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
        this.urlloader.load(urlreq);
	}

    //返回值
    private onComplete(event: egret.Event): void {
        //var loader: egret.URLLoader = <egret.URLLoader> event.target;
        //var data: egret.URLVariables = loader.data;
        //console.log(data.toString());
        console.log(this.urlloader.data );   //返回的是php网页
    }

    private onError(e: egret.IOErrorEvent): void {
        console.log("加载错误");
    }
}
