/**
*  文 件 名：GameConst.ts
*  功    能：游戏常量
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
class GameConst {
    /**框架启动*/
    public static START_UP: string = "START_UP";
    /**地图高宽*/
    public static MapWidth: number = 2000;
    public static MapHeight: number = 2000;
    /**场景高宽*/
    public static StageWidth: number = 850;
    public static StageHeight: number = 480;
    /**场景一半高宽*/
    public static HalfStageWidth: number = GameConst.StageWidth / 2;
    public static HalfStageHeight: number = GameConst.StageHeight / 2;
    /**怪物种类*/
    public static SkinKindCount: number = 7;
    
    /**IP*/
    public static IP: string = "192.168.1.50";
    //public static IP: string = "192.168.1.32";
    /**端口号*/
    public static PORT: number = 12345;
    //public static PORT: number = 8901;

    /**方块初始重量*/
    public static rectInitWeight:number = 10;
    /**玩家初始半径*/
    public static playerInitRadius: number = 20;
    /**玩家初始重量*/
    public static playerInitWeight: number = 10;
    /**玩家最小速度*/
    public static playerMinSpeed:number = 1;
    /**玩家最大速度*/
    public static playerMaxSpeed:number = 3;
    /**半径增大比例*/
    public static addRaduisRate: number = 0.3;
    /**速度减少比例*/
    public static addSpeedRate: number = 0.0007;
    /**泡泡初始宽度*/
    public static paopaoInitWidth:number = 10;
    /**发送吐泡泡技能的体重限制*/
    public static tuPaoPaoWeightLimit:number = 20;
    /**泡泡的重量*/
    public static paopaoWeight: number = 10;
    /**泡泡向前移动距离*/
    public static paopaoMoveDis: number = 200;
    /**达到重量才能使用分裂技能*/
    public static fenlieLimit: number = 20;
    /**分裂时，分身向前移动距离*/
    public static fenlieMoveDis:number = 200;
    /**分裂时，分身移动时间*/
    public static fenlieTime:number = 200;
    /**当拥有孢子总数小于等于该数时，允许分裂*/
    public static fenlieMax:number = 4;

    
}
