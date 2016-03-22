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
    GameConst.teamName = ""; //首页团队比拼时，创建的队伍
    GameConst.debug = true; //是否本地调试模式
    GameConst.invitInfo = {
        isInvit: true,
        name: "",
        teamName: "" //组建的队伍名字
    };
    return GameConst;
}());
egret.registerClass(GameConst,'GameConst');
