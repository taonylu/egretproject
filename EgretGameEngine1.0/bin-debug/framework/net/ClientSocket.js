/**
 * Socket类
 * @author chenkai
 * @date 2016/12/19
 */
var ClientSocket = (function (_super) {
    __extends(ClientSocket, _super);
    function ClientSocket() {
        _super.apply(this, arguments);
        /**重连次数限制*/
        this.reconnenctMax = 3;
        /**当前重连次数*/
        this.curReconnectCount = 0;
        /**是否允许重连*/
        this.allowReconnect = false;
    }
    var d = __define,c=ClientSocket,p=c.prototype;
    /**
     * serverUrl 服务器地址
     * @allowReconnect 是否允许重连(默认false)
     */
    p.connenct = function (serverUrl, allowReconnect) {
        if (allowReconnect === void 0) { allowReconnect = false; }
        this.resetReconnect();
        this.allowReconnect = allowReconnect;
        this.createSocket();
        this.socket.connectByUrl(serverUrl);
    };
    /**创建Socket*/
    p.createSocket = function () {
        if (this.socket == null) {
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceive, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
        }
    };
    /**连接成功*/
    p.onConnect = function (e) {
        this.resetReconnect();
        App.EventManager.sendEvent(SocketConst.SOCKET_CONNECT, this);
    };
    /**接收数据*/
    p.onReceive = function (e) {
        var byte = new egret.ByteArray();
        this.socket.readBytes(byte);
        //TODO
        //var proto:string = byte.readUTF();
        //var dataLen:number = byte.readInt();
        //var json = JSON.parse(byte.readUTFBytes(dataLen));
        //App.EventManager.sendEvent(proto,json);
    };
    /**连接错误*/
    p.onError = function (e) {
        if (this.checkReconnenct() == false) {
            App.EventManager.sendEvent(SocketConst.SOCKET_ERROR, this);
        }
    };
    /**连接断开*/
    p.onClose = function () {
        if (this.checkReconnenct()) {
            this.curReconnectCount++;
            this.socket.connectByUrl(this.serverUrl);
            App.EventManager.sendEvent(SocketConst.SOCKET_RECONNECT, this, this.curReconnectCount);
        }
        else {
            this.resetReconnect();
            App.EventManager.sendEvent(SocketConst.SOCKET_CLOSE, this);
        }
    };
    /**
     * 检查是否可以重连
     * @return 返回是否可以重连
     * */
    p.checkReconnenct = function () {
        return this.allowReconnect && (this.curReconnectCount < this.reconnenctMax);
    };
    /**重置重连参数*/
    p.resetReconnect = function () {
        this.curReconnectCount = 0;
    };
    return ClientSocket;
}(SingleClass));
egret.registerClass(ClientSocket,'ClientSocket');
//# sourceMappingURL=ClientSocket.js.map