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
        this.socket = io.connect(url);
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
        //屏幕准备
        this.socket.on(NetConst.loginComplete, function (data) {
            self.homeScene.revLoginComplete(data);
        });
        //玩家加入
        this.socket.on(NetConst.userJoin, function (data) {
            self.homeScene.revUserJoin(data);
        });
        //玩家退出
        this.socket.on(NetConst.userQuit, function (data) {
            self.homeScene.revUserQuit(data);
        });
        //游戏开始
        this.socket.on(NetConst.gameStart, function (data) {
            self.homeScene.revGameStart(data);
        });
        //玩家消除
        this.socket.on(NetConst.eliminate, function (data) {
            self.gameScene.revEliminate(data);
        });
        //使用道具(大屏幕)
        this.socket.on(NetConst.pro, function (data) {
            self.gameScene.revPro(data);
        });
        //使用道具（手机）
        this.socket.on(NetConst.userPro, function (data) {
            self.gameScene.revUserPro(data);
        });
        //地图更换
        this.socket.on(NetConst.luckyMap, function (data) {
            self.gameScene.revLuckyMap(data);
        });
        //游戏结束
        this.socket.on(NetConst.gameOver, function (data) {
            self.gameScene.revGameOver(data);
        });
    };
    //////////////////////////////////////////////////////
    /////////////////   事件处理    //////////////////////
    //////////////////////////////////////////////////////
    //连接成功
    p.onConnect = function () {
        egret.log("connenct succss");
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
    //发送数据
    p.sendMessage = function (cmd, data) {
        console.log("send:" + data);
        this.socket.emit(cmd, data);
    };
    return ClientSocket;
})();
egret.registerClass(ClientSocket,'ClientSocket');
