/**
*  文 件 名：ClientSocket.ts
*  功    能：Socket基类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/22
*  修改日期：2015/9/22
*  修改日志：
*/
var ClientSocket = (function () {
    function ClientSocket() {
        this.isConnecting = false; //socket是否处于正在连接状态，防止多次请求连接
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
        if (this.isConnecting == false) {
            this.isConnecting = true;
            this.webSocket.connect(this.IP, this.port);
            this.startTimer();
        }
    };
    __egretProto__.onSocketConnect = function () {
        console.log("socket connect success...");
        this.isConnecting = false;
        this.stopTimer();
        this.socketHand.onSocketConnect();
        if (this.dataBuffer != null) {
            this.send(this.dataBuffer);
            this.dataBuffer = null;
        }
    };
    __egretProto__.onSocketData = function () {
        var data = this.webSocket.readUTF();
        console.log("socket rev：" + data);
        try {
            var json = JSON.parse(data);
        }
        catch (e) {
            console.log("rev json is invalid");
            return;
        }
        this.socketHand.onSocketData(json);
    };
    __egretProto__.onSocketError = function () {
        console.log("socket connent error...");
        this.isConnecting = false;
        this.stopTimer();
        this.dataBuffer = null;
        this.socketHand.onSocketError();
    };
    __egretProto__.onSocketClose = function () {
        console.log("close socket...");
        this.isConnecting = false;
        this.stopTimer();
        this.dataBuffer = null;
        this.socketHand.onSocketClose();
    };
    __egretProto__.send = function (json) {
        if (this.webSocket && this.webSocket.connected) {
            var str = JSON.stringify(json);
            console.log("socket send msg:" + str);
            this.webSocket.writeUTF(str);
            this.webSocket.flush();
        }
        else if (this.isConnecting == false) {
            this.dataBuffer = json;
            this.connect();
        }
    };
    __egretProto__.close = function () {
        if (this.webSocket) {
            this.dataBuffer = null;
            this.isConnecting = false;
            this.stopTimer();
            this.webSocket.close();
        }
    };
    __egretProto__.setSocketHand = function (socketHand) {
        this.socketHand = socketHand;
    };
    __egretProto__.startTimer = function () {
        if (this.timer == null) {
            this.timer = new egret.Timer(10000);
        }
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.timer.reset();
        this.timer.start();
    };
    __egretProto__.stopTimer = function () {
        if (this.timer != null) {
            this.timer.stop();
        }
    };
    __egretProto__.onTimerComplete = function () {
        this.close();
        this.socketHand.onSocketConnectTimeOver();
    };
    return ClientSocket;
})();
ClientSocket.prototype.__class__ = "ClientSocket";
