/**
 * 通讯类
 * @author
 *
 */
var ClientSocket = (function () {
    function ClientSocket() {
    }
    var d = __define,c=ClientSocket,p=c.prototype;
    ClientSocket.getInstance = function () {
        if (this.instance == null) {
            this.instance = new ClientSocket();
        }
        return this.instance;
    };
    p.isConnected = function () {
        if (this.socket && this.socket.connected) {
            return true;
        }
        return false;
    };
    p.closeSocket = function () {
        egret.log("主动断开连接");
        this.socket.disconnect();
    };
    p.startConnect = function () {
        //连接socket
        this.socket = io.connect(window["server"], { reconnection: false, 'force new connection': true });
        var self = this;
        //连接成功 
        this.socket.on('connect', function () {
            egret.log("connect success");
            self.homeScene.onConnect();
        });
        //连接失败    
        this.socket.on('error', function (data) {
            egret.log("socket error");
            self.homeScene.onError(data);
        });
        //断开连接    
        this.socket.on('disconnect', function () {
            egret.log("socket disconnect");
            self.homeScene.onDisconnect();
        });
        //////////////////////////////////////////////////////
        /////////////////   接收数据     //////////////////////
        //////////////////////////////////////////////////////
        this.socket.on("gameOver", function (data) {
            self.homeScene.revGameOver(data);
        });
    };
    //////////////////////////////////////////////////////
    /////////////////   事件处理    //////////////////////
    //////////////////////////////////////////////////////
    p.sendMessage = function (cmd, data, callBack, thisObject) {
        if (data === void 0) { data = null; }
        if (callBack === void 0) { callBack = null; }
        if (thisObject === void 0) { thisObject = null; }
        if (this.socket && this.socket.connected) {
            this.socket.emit(cmd, data, function (data) {
                if (callBack && thisObject) {
                    callBack.call(thisObject, data);
                }
            });
        }
    };
    return ClientSocket;
})();
egret.registerClass(ClientSocket,'ClientSocket');
