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
* var http:HttpUtil = new HttpUtil();
* http.completeHandler = this.completeHandler;
* http.errorHandler = this.errorHandler;
*  
* //GET
* var url: string = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/xbLottery" + "/pass/" + pass;
* var msg: string = "";
* http.send(url,egret.HttpMethod.GET,msg, this);
*  
* //POST
* var url: string = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/xbLottery" + "/pass/" + pass;
* var msg: string = "p1=postP1&p2=postP2";
* http.send(url,egret.HttpMethod.POST,msg, this);
*/

class HttpUtil {
    public completeHandler:Function;   //完成回调函数
    public errorHandler:Function;      //错误回调函数
    public thisObject:any;             //回调函数绑定对象
    private request:egret.HttpRequest; //请求
    
	public constructor() {
        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
	}
	
	public send(url:string, httpMethod:string, msg:any , obj:any){
        this.thisObject = obj;
        this.request.open(url ,httpMethod);
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
        if(this.errorHandler) {
            this.errorHandler.call(this.thisObject,e);
        }
	}
	
}
