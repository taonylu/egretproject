/**
 *
 * @author
 *
 */
var GameConst = (function () {
    function GameConst() {
    }
    var d = __define,c=GameConst,p=c.prototype;
    GameConst.orientation = 0; //0竖屏
    GameConst.teamName = ""; //首页组队比拼时，创建的队伍名，用于分享
    GameConst.debug = false; //是否本地调试模式
    GameConst.myName = ""; //我自己的名字
    GameConst.invitInfo = {
        isInvit: 0,
        nickName: "",
        teamName: "" //组建的队伍名字
    };
    GameConst.validSigne = {
        keyword: "",
        timestamp: 0,
        signature: ""
    };
    return GameConst;
}());
egret.registerClass(GameConst,'GameConst');
