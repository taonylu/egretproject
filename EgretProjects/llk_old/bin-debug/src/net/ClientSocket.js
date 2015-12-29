/**
*  文 件 名：ClientSocket.ts
*  功    能： 客户端Socket
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/14
*  修改日期：2015/9/14
*  修改日志：
*/
var ClientSocket = (function () {
    function ClientSocket() {
        this.tempMsg = ""; //临时数据
        this.IP = "192.168.1.50";
        this.port = 12345;
    }
    var __egretProto__ = ClientSocket.prototype;
    ClientSocket.getInstance = function () {
        if (this.instance == null) {
            this.instance = new ClientSocket();
        }
        return this.instance;
    };
    __egretProto__.connect = function () {
        console.log("start connect socket...");
        if (this.webSocket == null) {
            this.webSocket = new egret.WebSocket();
            this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
            this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketConnect, this);
            this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        }
        this.webSocket.connect(this.IP, this.port);
    };
    __egretProto__.onSocketConnect = function () {
        console.log("socket connect success...");
        if (this.tempMsg != "") {
            this.send(this.tempMsg);
            this.tempMsg = "";
        }
        this.callBack.onSocketConnect();
    };
    __egretProto__.onSocketData = function (e) {
        var data = this.webSocket.readUTF();
        console.log("socket rev data：" + data);
        var json = JSON.parse(data);
        this.callBack.onSocketData(json);
    };
    __egretProto__.onSocketError = function (e) {
        console.log("socket connent error...");
        this.callBack.onSocketError();
    };
    __egretProto__.send = function (jsonMsg) {
        console.log("socket send msg:" + jsonMsg);
        if (this.webSocket && this.webSocket.connected) {
            this.webSocket.writeUTF(jsonMsg);
            this.webSocket.flush();
        }
        else {
            console.log("socket is close,can't send msg...");
            this.tempMsg = jsonMsg;
            this.connect();
        }
    };
    __egretProto__.onSocketClose = function () {
        console.log("close socket...");
        this.tempMsg = "";
        this.callBack.onSocketClose();
    };
    __egretProto__.setCallBack = function (callBack) {
        this.callBack = callBack;
    };
    return ClientSocket;
})();
ClientSocket.prototype.__class__ = "ClientSocket";
