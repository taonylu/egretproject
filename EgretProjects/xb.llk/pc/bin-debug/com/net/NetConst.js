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
    NetConst.loginComplete = "`loginComplete`"; //登录完成
    NetConst.userJoin = "userJoin"; //玩家加入
    NetConst.userQuit = "userQuit"; //玩家退出
    NetConst.gameStart = "gameStart"; //游戏开始
    NetConst.eliminate = "eliminate"; //消除
    NetConst.pro = "pro"; //返回使用道具
    NetConst.userPro = "userPro"; //使用道具
    NetConst.luckyMap = "luckMap"; //更换地图
    NetConst.gameOver = "gameOver"; //游戏结束
    NetConst.levelDone = "levelDone"; //关卡结束
    return NetConst;
})();
egret.registerClass(NetConst,'NetConst');
