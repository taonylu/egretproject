/**
 * Socket类
 * @author chenkai
 * @date 2016/12/19
 */
class ClientSocket extends SingleClass{
	/**WebSocket*/
	private socket:egret.WebSocket;
	/**服务器地址*/
	private serverUrl:string;
	
	/**重连次数限制*/
	private reconnenctMax:number = 3;
	/**当前重连次数*/
	private curReconnectCount:number = 0;
	/**是否允许重连*/
	private allowReconnect:boolean = false;

	/**
	 * serverUrl 服务器地址
	 * @allowReconnect 是否允许重连(默认false)
	 */
	public connenct(serverUrl:string, allowReconnect:boolean = false){
		this.resetReconnect();
		this.allowReconnect = allowReconnect;
		this.createSocket();
		this.socket.connectByUrl(serverUrl);
	}

	/**创建Socket*/
	private createSocket(){
		if(this.socket == null){
			this.socket = new egret.WebSocket();
			this.socket.type = egret.WebSocket.TYPE_BINARY;
			this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
			this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceive, this);
			this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
			this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
		}
	}

	/**连接成功*/
	private onConnect(e:egret.Event){
		this.resetReconnect();
		App.EventManager.sendEvent(SocketConst.SOCKET_CONNECT, this);
	}

	/**接收数据*/
	private onReceive(e:egret.Event){
		var byte:egret.ByteArray = new egret.ByteArray();
        this.socket.readBytes(byte);

		//TODO
		//var proto:string = byte.readUTF();
		//var dataLen:number = byte.readInt();
        //var json = JSON.parse(byte.readUTFBytes(dataLen));
		//App.EventManager.sendEvent(proto,json);
	}

	/**连接错误*/
	private onError(e:egret.Event){
		if(this.checkReconnenct() == false){
			App.EventManager.sendEvent(SocketConst.SOCKET_ERROR, this);
		}
	}

	/**连接断开*/
	private onClose(){
		if(this.checkReconnenct()){
			this.curReconnectCount++;
			this.socket.connectByUrl(this.serverUrl);
			App.EventManager.sendEvent(SocketConst.SOCKET_RECONNECT, this, this.curReconnectCount);
		}else{
			this.resetReconnect();
			App.EventManager.sendEvent(SocketConst.SOCKET_CLOSE, this);
		}
	}

	/**
	 * 检查是否可以重连
	 * @return 返回是否可以重连
	 * */
	private checkReconnenct(){
		return this.allowReconnect && (this.curReconnectCount < this.reconnenctMax);
	}

	/**重置重连参数*/
	private resetReconnect(){
		this.curReconnectCount = 0;
	}
}