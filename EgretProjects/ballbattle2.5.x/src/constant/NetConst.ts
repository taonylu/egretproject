/**
*  文 件 名：NetConst.ts
*  功    能：网络常量
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/23
*  修改日期：2015/9/23
*  修改日志：
*/
class NetConst {
    /**登录命令 1000*/
    public static LOGIN_REQUEST: number = 1000;
    /**开始游戏请求 1001*/
    public static START_REQUEST: number = 1001;
    /**玩家加入 1002*/
    public static NEW_PLAYER_JOIN: number = 1002;
    /**玩家移动请求 1004*/
    public static MOVE_REQUEST: number = 1004;
    /**玩家互吃 1005*/
    public static EAT_PLAYER: number = 1005;
    /**玩家吃方块 1006*/
    public static EAT_RECT: number = 1006;
    /**生成新的方块*/
    public static CREATE_NEW_RECT: number = 1007;
    /**用户离开*/
    public static USER_LEAVE: number = 1008;
    /**吐泡泡*/
    public static TU_PAO_PAO: number = 1009;
    /**吃泡泡*/
    public static EAT_PAO_PAO:number = 1010;
    /**分裂*/
    public static FEN_LIE:number = 1011;
}
