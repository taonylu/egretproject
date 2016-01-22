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
            self.onConnect();
        });
        //连接失败    
        this.socket.on('error', function (data) {
            self.onError(data);
        });
        //断开连接    
        this.socket.on('disconnect', function () {
            self.onDisconnect();
        });
        //尝试重新连接
        this.socket.on('reconnect_attempt', function () {
            self.onReconnectAttempt();
        });
        //连接超时
        this.socket.on('connect_timeout', function () {
            //self.onReconnectAttempt();
        });
        //////////////////////////////////////////////////////
        /////////////////   接收数据     //////////////////////
        //////////////////////////////////////////////////////
        //是否被选为大屏幕
        this.socket.on("chooseForScreen", function (data) {
            console.log("大屏幕");
            UserManager.getInstance().bLuckUser = true;
        });
        //排队信息
        this.socket.on("queueInfo", function (data) {
            self.homeScene.revQueue(data);
        });
        //被施放道具
        this.socket.on(NetConst.S2C_pro, function (data) {
            self.gameScene.revPro(data);
        });
        //关卡地图
        this.socket.on(NetConst.S2C_mapData, function (data) {
            self.homeScene.revMapData(data);
        });
        //游戏结束
        this.socket.on(NetConst.S2C_gameOver, function (data) {
            self.gameScene.revGameOver(data);
        });
    };
    //////////////////////////////////////////////////////
    /////////////////   事件处理    //////////////////////
    //////////////////////////////////////////////////////
    //连接成功
    p.onConnect = function () {
        egret.log("connenct succss");
        GameManager.getInstance().onConnect();
    };
    //连接失败
    p.onError = function (data) {
        egret.log("connenct erro");
        GameManager.getInstance().onError();
    };
    //连接断开
    p.onDisconnect = function () {
        egret.log("connenct close");
        GameManager.getInstance().onDisconnect();
    };
    //尝试重新连接
    p.onReconnectAttempt = function () {
        egret.log("reconnect");
    };
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
