/**
 * Socket常量
*/
var SocketConst = (function () {
    function SocketConst() {
    }
    var d = __define,c=SocketConst,p=c.prototype;
    /**Socket连接成功*/
    SocketConst.SOCKET_CONNECT = "SOCKET_CONNECT";
    /**Socket连接错误*/
    SocketConst.SOCKET_ERROR = "SOCKET_ERROR";
    /**Socket关闭*/
    SocketConst.SOCKET_CLOSE = "SOCKET_CLOSE";
    /**Socket重连*/
    SocketConst.SOCKET_RECONNECT = "SOCKET_RECONNECT";
    return SocketConst;
}());
egret.registerClass(SocketConst,'SocketConst');
//# sourceMappingURL=SocketConst.js.map