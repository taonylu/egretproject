/**
*  文 件 名： HttpUtil.ts
*  功    能： Http请求
*  内    容： 
*  作    者： Rikimaru
*  生成日期： 2015/8/22
*  修改日期： 2016/3/7
*  修改日志：
* 
* Example:
 var http:HttpUtil = new HttpUtil();
 this.http.completeHandler = this.completeHandler;
 this.http.errorHandler = this.errorHandler;
  
 //GET
 var url: string = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/xbLottery" + "/pass/" + pass;
 var msg: string = "";
 this.http.send(url,msg, this);
  
 //POST
 var url: string = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/xbLottery" + "/pass/" + pass;
 var msg: string = "p1=postP1&p2=postP2";
 this.http.send(url,msg, this);
*/

class HttpUtil {
    public completeHandler:Function;   //完成回调函数
    public errorHandler:Function;      //错误回调函数
    public thisObject:any;             //回调函数绑定对象
    public httpMethod: string = egret.HttpMethod.GET; //发送方式POST or GET
    
    private request: egret.HttpRequest; //请求
    
	public constructor() {
        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
	}
	
	public send(url:string, msg:any , obj:any){
        this.thisObject = obj;
        this.request.open(url ,this.httpMethod);
        this.request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        if(msg != ""){
            this.request.send(msg);
        }else{
            this.request.send();
        }
	}
	
	private onPostComplete(e:egret.Event):void{
        if(this.completeHandler){
            this.completeHandler.call(this.thisObject, this.request.response);
    	}
	}
	
	private onPostIOError(e:egret.IOErrorEvent):void{
    	  egret.log("http error");
        if(this.errorHandler) {
            this.errorHandler.call(this.thisObject,e);
        }
	}
	
}
