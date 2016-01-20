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
        //玩家弹幕
        this.socket.on(NetConst.S2C_barrage, function (data) {
            GameManager.getInstance().revBarrage(data);
        });
        //玩家加入
        this.socket.on(NetConst.S2C_userJoin, function (data) {
            self.homeScene.revUserJoin(data);
        });
        //玩家退出
        this.socket.on(NetConst.S2C_userQuit, function (data) {
            self.homeScene.revUserQuit(data);
        });
        //游戏开始
        this.socket.on(NetConst.S2C_gameStart, function (data) {
            self.homeScene.revGameStart(data);
        });
        //玩家消除
        this.socket.on(NetConst.S2C_eliminate, function (data) {
            self.gameScene.revEliminate(data);
        });
        //使用道具(大屏幕)
        this.socket.on(NetConst.S2C_pro, function (data) {
            self.gameScene.revPro(data);
        });
        //地图更换
        this.socket.on(NetConst.S2C_luckyMap, function (data) {
            self.gameScene.revLuckyMap(data);
        });
        //游戏结束
        this.socket.on(NetConst.S2C_gameOver, function (data) {
            self.gameScene.revGameOver(data);
        });
        //倒计时
        this.socket.on("countDown", function (data) {
            self.homeScene.revCountDown(data);
        });
        //清除倒计时
        this.socket.on("clearCountDown", function (data) {
            self.homeScene.revClearCountDown(data);
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
        alert("连接失败，请尝试刷新网页");
        egret.log("connenct erro");
    };
    //连接断开
    p.onDisconnect = function () {
        alert("已与服务器断开连接，请尝试刷新网页");
        egret.log("connenct close");
    };
    //尝试重新连接
    p.onReconnectAttempt = function () {
        egret.log("reconnect");
    };
    //发送数据
    p.sendMessage = function (cmd, data, callBack, thisObject) {
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
