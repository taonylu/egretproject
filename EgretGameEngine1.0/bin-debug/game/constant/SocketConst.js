var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Socket常量
*/
var SocketConst = (function () {
    function SocketConst() {
    }
    return SocketConst;
}());
/**Socket连接成功*/
SocketConst.SOCKET_CONNECT = "SOCKET_CONNECT";
/**Socket连接错误*/
SocketConst.SOCKET_ERROR = "SOCKET_ERROR";
/**Socket关闭*/
SocketConst.SOCKET_CLOSE = "SOCKET_CLOSE";
/**Socket重连*/
SocketConst.SOCKET_RECONNECT = "SOCKET_RECONNECT";
__reflect(SocketConst.prototype, "SocketConst");
