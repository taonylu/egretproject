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
        this.socket = io.connect(GameConst.gameConfig.server, { reconnection: false, 'force new connection': true });
        var self = this;
        //连接成功 
        this.socket.on('connect', function () {
            egret.log("connenct succss");
            self.homeScene.connect();
        });
        //连接失败    
        this.socket.on('error', function (data) {
            egret.log("connenct erro");
            alert("与服务器连接错误");
        });
        //断开连接    
        this.socket.on('disconnect', function () {
            egret.log("connenct close");
            alert("与服务器断开连接");
        });
        //尝试重新连接
        this.socket.on('reconnect_attempt', function () {
            egret.log("reconnect");
        });
        //连接超时
        this.socket.on('connect_timeout', function () {
            egret.log("connect_timeout");
            alert("连接超时");
        });
        //////////////////////////////////////////////////////
        /////////////////   接收数据     //////////////////////
        //////////////////////////////////////////////////////
        this.socket.on("login", function (data) {
            self.homeScene.revLogin(data);
        });
        this.socket.on("rank", function (data) {
            self.homeScene.revRank(data);
        });
        this.socket.on("userJoin", function (data) {
            self.homeScene.revUserJoin(data);
        });
        this.socket.on("userQuit", function (data) {
            self.homeScene.revUserQuit(data);
        });
        this.socket.on("action", function (data) {
            self.gameScene.revAction(data);
        });
        this.socket.on("gameOver", function (data) {
            self.gameScene.revGameOver(data);
        });
    };
    //////////////////////////////////////////////////////
    /////////////////   发送数据    //////////////////////
    //////////////////////////////////////////////////////
    p.sendMessage = function (cmd, data, callBack, thisObject) {
        if (data === void 0) { data = null; }
        if (callBack === void 0) { callBack = null; }
        if (thisObject === void 0) { thisObject = null; }
        if (this.socket && this.socket.connected) {
            this.socket.emit(cmd, data, function (revData) {
                if (callBack && thisObject) {
                    callBack.call(thisObject, revData);
                }
            });
        }
    };
    return ClientSocket;
}());
egret.registerClass(ClientSocket,'ClientSocket');
