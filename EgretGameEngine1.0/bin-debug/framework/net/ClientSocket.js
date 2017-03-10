var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Socket类
 * @author chenkai
 * @date 2016/12/19
 *
 * Example:
 * App.Socket.connect("127.0.0.1:3000");
 * App.socket.Send("Login",{account:"chenkai", password:"123456"});
 */
var ClientSocket = (function (_super) {
    __extends(ClientSocket, _super);
    function ClientSocket() {
        var _this = _super.apply(this, arguments) || this;
        /**重连次数限制*/
        _this.reconnenctMax = 3;
        /**当前重连次数*/
        _this.curReconnectCount = 0;
        /**是否允许重连*/
        _this.allowReconnect = false;
        return _this;
    }
    /**
     * serverUrl 服务器地址
     * @allowReconnect 是否允许重连(默认false)
     */
    ClientSocket.prototype.connect = function (serverUrl, allowReconnect) {
        if (allowReconnect === void 0) { allowReconnect = false; }
        this.resetReconnect();
        this.allowReconnect = allowReconnect;
        this.createSocket();
        this.socket.connectByUrl(serverUrl);
    };
    /**创建Socket*/
    ClientSocket.prototype.createSocket = function () {
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
    ClientSocket.prototype.onConnect = function (e) {
        this.resetReconnect();
        App.sendNotification(SocketConst.SOCKET_CONNECT);
    };
    /**
     * 发送数据
     * @param proto 数据协议
     * @param json  json格式数据
     */
    ClientSocket.prototype.send = function (proto, json) {
        var data = JSON.stringify(json);
        var byte = new egret.ByteArray();
        byte.writeUTF(proto);
        byte.writeInt(data.length);
        byte.writeUTFBytes(data);
        this.socket.writeBytes(byte);
        this.socket.flush();
    };
    /**接收数据*/
    ClientSocket.prototype.onReceive = function (e) {
        var byte = new egret.ByteArray();
        this.socket.readBytes(byte);
        var proto = byte.readUTF();
        var dataLen = byte.readInt();
        var json = JSON.parse(byte.readUTFBytes(dataLen));
        App.sendNotification(proto, json);
    };
    /**连接错误*/
    ClientSocket.prototype.onError = function (e) {
        if (this.checkReconnenct() == false) {
            App.sendNotification(SocketConst.SOCKET_ERROR);
        }
    };
    /**连接断开*/
    ClientSocket.prototype.onClose = function () {
        if (this.checkReconnenct()) {
            this.curReconnectCount++;
            this.socket.connectByUrl(this.serverUrl);
            App.sendNotification(SocketConst.SOCKET_RECONNECT, this.curReconnectCount);
        }
        else {
            this.resetReconnect();
            App.sendNotification(SocketConst.SOCKET_CLOSE);
        }
    };
    /**
     * 检查是否可以重连
     * @return 返回是否可以重连
     * */
    ClientSocket.prototype.checkReconnenct = function () {
        return this.allowReconnect && (this.curReconnectCount < this.reconnenctMax);
    };
    /**重置重连参数*/
    ClientSocket.prototype.resetReconnect = function () {
        this.curReconnectCount = 0;
    };
    return ClientSocket;
}(SingleClass));
__reflect(ClientSocket.prototype, "ClientSocket");
