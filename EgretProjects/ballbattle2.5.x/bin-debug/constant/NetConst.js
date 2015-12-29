/**
*  文 件 名：NetConst.ts
*  功    能：网络常量
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/23
*  修改日期：2015/9/23
*  修改日志：
*/
var NetConst = (function () {
    function NetConst() {
    }
    var d = __define,c=NetConst;p=c.prototype;
    /**登录命令 1000*/
    NetConst.LOGIN_REQUEST = 1000;
    /**开始游戏请求 1001*/
    NetConst.START_REQUEST = 1001;
    /**玩家加入 1002*/
    NetConst.NEW_PLAYER_JOIN = 1002;
    /**玩家移动请求 1004*/
    NetConst.MOVE_REQUEST = 1004;
    /**玩家互吃 1005*/
    NetConst.EAT_PLAYER = 1005;
    /**玩家吃方块 1006*/
    NetConst.EAT_RECT = 1006;
    /**生成新的方块*/
    NetConst.CREATE_NEW_RECT = 1007;
    /**用户离开*/
    NetConst.USER_LEAVE = 1008;
    /**吐泡泡*/
    NetConst.TU_PAO_PAO = 1009;
    /**吃泡泡*/
    NetConst.EAT_PAO_PAO = 1010;
    /**分裂*/
    NetConst.FEN_LIE = 1011;
    return NetConst;
})();
egret.registerClass(NetConst,"NetConst");
