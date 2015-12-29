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
        this.dataLenMin = 4; //数据最小长度
    }
    var d = __define,c=ClientSocket;p=c.prototype;
    ClientSocket.getInstance = function () {
        if (this.instance == null) {
            this.instance = new ClientSocket();
        }
        return this.instance;
    };
    p.connect = function () {
        console.log("start connect socket...");
        if (this.webSocket == null) {
            this.webSocket = new egret.WebSocket();
            this.webSocket.type = egret.WebSocket.TYPE_BINARY;
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
    p.onSocketConnect = function () {
        console.log("socket connect success...");
        this.isConnecting = false;
        this.stopTimer();
        this.socketHand.onSocketConnect();
        if (this.dataBuffer != null) {
            this.send(this.dataBuffer);
            this.dataBuffer = null;
        }
    };
    p.onSocketData = function () {
        var byteArray = new egret.ByteArray();
        this.webSocket.readBytes(byteArray);
        //判断数据总长是否大于最小长度限制
        var totalLen = byteArray.length;
        if (totalLen < this.dataLenMin) {
            console.log("rev data len < 4");
            return;
        }
        //根据消息包长度，读取指定长度的数据
        var readedLen = 0; //已读取的长度
        var msgLen = 0; //一个消息长度
        var cmd = 0; //命令
        while ((totalLen - readedLen) > this.dataLenMin) {
            cmd = byteArray.readShort();
            msgLen = byteArray.readShort();
            if (msgLen < totalLen - readedLen) {
                console.log("rev data len is not enough");
                return;
            }
            byteArray.position = readedLen;
            this.socketHand.onSocketData(cmd, byteArray);
            readedLen += msgLen;
        }
    };
    p.onSocketError = function () {
        console.log("socket connent error...");
        this.isConnecting = false;
        this.stopTimer();
        this.dataBuffer = null;
        this.socketHand.onSocketError();
    };
    p.onSocketClose = function () {
        console.log("close socket...");
        this.isConnecting = false;
        this.stopTimer();
        this.dataBuffer = null;
        this.socketHand.onSocketClose();
    };
    p.send = function (byteArray) {
        if (this.webSocket && this.webSocket.connected) {
            this.webSocket.writeBytes(byteArray);
            this.webSocket.flush();
        }
        else if (this.isConnecting == false) {
            this.dataBuffer = byteArray;
            this.connect();
        }
    };
    p.close = function () {
        if (this.webSocket) {
            this.dataBuffer = null;
            this.isConnecting = false;
            this.stopTimer();
            this.webSocket.close();
        }
    };
    p.setSocketHand = function (socketHand) {
        this.socketHand = socketHand;
    };
    p.startTimer = function () {
        if (this.timer == null) {
            this.timer = new egret.Timer(10000);
        }
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.timer.reset();
        this.timer.start();
    };
    p.stopTimer = function () {
        if (this.timer != null) {
            this.timer.stop();
        }
    };
    p.onTimerComplete = function () {
        this.close();
        this.socketHand.onSocketConnectTimeOver();
    };
    return ClientSocket;
})();
egret.registerClass(ClientSocket,"ClientSocket");

/**
*  文 件 名：ISocketHand.ts
*  功    能：socket处理类接口
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/23
*  修改日期：2015/9/23
*  修改日志：
*/

