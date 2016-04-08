/**
 *
 * @author
 *
 */
var GameConst = (function () {
    function GameConst() {
    }
    var d = __define,c=GameConst,p=c.prototype;
    /**是否调试模式*/
    GameConst.debug = false;
    /**校准位置X*/
    GameConst.centerX = 0;
    /**校准位置Z*/
    GameConst.centerZ = 0;
    GameConst.gameConfig = {
        debug: true,
        subscribe: 0,
        picture: "",
        openid: "",
        headimgurl: "",
        nickname: "",
        server: "",
        rid: "" //房间号 
    };
    return GameConst;
}());
egret.registerClass(GameConst,'GameConst');
