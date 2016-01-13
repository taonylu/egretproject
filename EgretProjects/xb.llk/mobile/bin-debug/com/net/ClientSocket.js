/**
 * 通讯类
 * @author
 *
 */
var ClientSocket = (function () {
    function ClientSocket() {
        this.connected = false; //是否连接
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
            self.connected = true;
            self.onConnect();
        });
        //连接失败    
        this.socket.on('error', function (data) {
            self.connected = false;
            self.onError(data);
        });
        //断开连接    
        this.socket.on('disconnect', function () {
            self.connected = false;
            self.onDisconnect();
        });
        //尝试重新连接
        this.socket.on('reconnect_attempt', function () {
            self.connected = false;
            self.onReconnectAttempt();
        });
        //////////////////////////////////////////////////////
        /////////////////   接收数据     //////////////////////
        //////////////////////////////////////////////////////
        //用户登录
        this.socket.on(NetConst.S2C_login, function (data) {
            GameManager.getInstance().revLogin(data);
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
    //发送数据
    p.sendMessage = function (cmd, json) {
        if (this.connected) {
            this.socket.emit(cmd, json);
        }
        else {
        }
    };
    return ClientSocket;
})();
egret.registerClass(ClientSocket,'ClientSocket');
