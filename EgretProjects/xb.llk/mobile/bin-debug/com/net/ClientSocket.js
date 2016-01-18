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
    p.startConnect = function (url) {
        //连接socket
        this.socket = io.connect(url, { reconnection: false });
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
        //////////////////////////////////////////////////////
        /////////////////   接收数据     //////////////////////
        //////////////////////////////////////////////////////
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
    };
    //连接断开
    p.onDisconnect = function () {
        egret.log("connenct close");
    };
    //尝试重新连接
    p.onReconnectAttempt = function () {
        egret.log("reconnect");
    };
    p.sendMessage = function (cmd, data, callBack, thisObject) {
        if (data === void 0) { data = null; }
        if (callBack === void 0) { callBack = null; }
        if (thisObject === void 0) { thisObject = null; }
        if (this.socket.connected) {
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
