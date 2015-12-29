/**
*  文 件 名：GameConst.ts
*  功    能： 游戏常量
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
var GameConst = (function () {
    function GameConst() {
    }
    var __egretProto__ = GameConst.prototype;
    //---------------------[命令常量]-----------------
    /**App启动命令*/
    GameConst.CMD_StartUp = "StartUp";
    GameConst.C2S_LOGIN = 1000;
    GameConst.S2C_LOGIN_SUCCES = 1001;
    GameConst.C2S_SUBMIT_SCORE = 1002;
    GameConst.S2C_RANK = 1003;
    return GameConst;
})();
GameConst.prototype.__class__ = "GameConst";
