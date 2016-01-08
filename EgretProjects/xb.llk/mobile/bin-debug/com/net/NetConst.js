/**
 * 网络常量
 * @author
 *
 */
var NetConst = (function () {
    function NetConst() {
    }
    var d = __define,c=NetConst,p=c.prototype;
    NetConst.url = "http://192.168.1.103:3000"; //IP、端口号
    //接收
    NetConst.S2C_userInfo = "userInfo"; //用户信息
    NetConst.S2C_mapData = "mapData"; //关卡地图数据
    NetConst.S2C_pro = "pro"; //被施放道具
    NetConst.S2C_gameOver = "gameOver"; //游戏结束
    //发送
    NetConst.C2S_barrage = "barrage"; //发送弹幕
    NetConst.C2S_upMap = "upMap"; //无可消除，随机地图，提交地图
    NetConst.C2S_eliminate = "eliminate"; //玩家消除
    NetConst.C2S_usePro = "usePro"; //玩家使用道具
    return NetConst;
})();
egret.registerClass(NetConst,'NetConst');
