/**
 * 网络常量
 * @author
 *
 */
var NetConst = (function () {
    function NetConst() {
    }
    var d = __define,c=NetConst,p=c.prototype;
    //-----------------发送数据----------------------
    NetConst.C2S_login = "login"; //请求登录
    //-----------------接收数据----------------------
    NetConst.S2C_barrage = "barrage"; //弹幕
    NetConst.S2C_login = "login"; //登录完成
    NetConst.S2C_userJoin = "userJoin"; //玩家加入
    NetConst.S2C_userQuit = "userQuit"; //玩家退出
    NetConst.S2C_gameStart = "gameStart"; //游戏开始
    NetConst.S2C_eliminate = "eliminate"; //消除
    NetConst.S2C_pro = "pro"; //返回使用道具
    NetConst.S2C_luckyMap = "luckMap"; //更换地图，玩家无可消除，随机地图
    NetConst.S2C_mapData = "mapData"; //更换地图，下一关
    NetConst.S2C_gameOver = "gameOver"; //游戏结束 
    return NetConst;
})();
egret.registerClass(NetConst,'NetConst');
