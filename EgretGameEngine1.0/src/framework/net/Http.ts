/**
 * Http请求类
 * 序列发送http请求
 * @author chenkai
 * @date 2016/12/18
 * 
 * Example:
 * App.Http.initServer("http://123123123.com");
 * App.Http.send({head:"login",account:"chenkai"}, this.revLogin, this);
 */
class Http extends SingleClass{
	/**Request*/
	private request:egret.HttpRequest;
	/**请求地址*/
	private serverUrl:string;
	/**请求格式POST or GET*/
	public httpMethod:string = egret.HttpMethod.POST;
	/**发送缓存*/
	private cacheList = [];
	/**当前发送内容*/
	private curSend;
	/**请求状态*/
	private requesting:boolean = false;

	public constructor(){
		super();
		this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.addEventListener(egret.Event.COMPLETE,this.onSendComplete,this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSendIOError,this);
	}

	/**
	 * 初始化http访问地址
	 * @serverUrl 访问地址
	 */
	public initServerUrl(serverUrl:string){
		this.serverUrl = serverUrl;
	}

	/**
	 * 发送
	 * @msg 消息字符串 一般为json格式
	 * @callBack 回调
	 * @thisObject 回调执行对象
	 */
    public send(msg, callBack:Function, thisObject:any){
        this.cacheList.push([JSON.stringify(msg), callBack, thisObject]);
		this.next();
	}

	/**发送下一条*/
	private next(){
		//当前正在发送时，需要等待
		if(this.requesting){
			return;
		}
		//全部发送完成，停止发送
		if(this.cacheList.length == 0){
			return;
		}
		//获取数组第一条待发送包
		this.curSend = this.cacheList.shift();
		//发送数据
		this.request.open(this.serverUrl ,this.httpMethod);
		//设置编码 JSON:application/json
        this.request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		//根据POST和GET方式，选择是否发送msg数据
		if(this.httpMethod == egret.HttpMethod.POST){
			this.request.send(this.curSend[0]);
		}else{
			this.request.send();
		}
		//设置发送状态
		this.requesting = true;
	}
	
	/**发送完成*/
	private onSendComplete(e:egret.Event):void{
		if(this.curSend){
			this.curSend[1].call(this.curSend[2], this.request.response);
		}

		this.requesting = false;
		this.next();
	}
	
	/**发送失败*/
	private onSendIOError(e:egret.IOErrorEvent):void{
		 console.error("Http send error");
    	 this.requesting = false;
		 this.next();
	}

	/**删除所有请求*/
	public clearAllRequest(){
		this.request.abort();
		this.curSend = null;
		this.cacheList.length = 0;
	}
}
