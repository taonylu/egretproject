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
        this.socket = io.connect(window["gameConfig"].server, { reconnection: false, 'force new connection': true });
        console.log("connect:", window["gameConfig"].server);
        var self = this;
        //连接成功 
        this.socket.on('connect', function () {
            egret.log("connenct succss");
            self.gameManager.connect();
        });
        //连接失败    
        this.socket.on('error', function (data) {
            egret.log("connenct erro");
        });
        //断开连接    
        this.socket.on('disconnect', function () {
            egret.log("connenct close");
            self.gameManager.disconnect();
        });
        //尝试重新连接
        this.socket.on('reconnect_attempt', function () {
            egret.log("reconnect");
        });
        //连接超时
        this.socket.on('connect_timeout', function () {
            //self.onReconnectAttempt();
        });
        //////////////////////////////////////////////////////
        /////////////////   接收数据     //////////////////////
        //////////////////////////////////////////////////////
        this.socket.on("startLock", function (data) {
            self.gameManager.revStartLock();
        });
        this.socket.on("assignRole", function (data) {
            self.lockScene.revAssignRole(data);
        });
        this.socket.on("startGame", function (data) {
            self.lockScene.revStartGame();
        });
        this.socket.on("gameOver", function (data) {
            self.gameScene.revGameOver(data);
        });
        this.socket.on("prize", function (data) {
            self.gameScene.revPrize();
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
            this.socket.emit(cmd, data, function (data) {
                if (callBack && thisObject) {
                    callBack.call(thisObject, data);
                }
            });
        }
    };
    return ClientSocket;
}());
egret.registerClass(ClientSocket,'ClientSocket');
