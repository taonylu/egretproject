/**
*  文 件 名：GameConst.ts
*  功    能：游戏常量
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
var GameConst = (function () {
    function GameConst() {
    }
    var d = __define,c=GameConst;p=c.prototype;
    /**框架启动*/
    GameConst.START_UP = "START_UP";
    /**地图高宽*/
    GameConst.MapWidth = 2000;
    GameConst.MapHeight = 2000;
    /**场景高宽*/
    GameConst.StageWidth = 850;
    GameConst.StageHeight = 480;
    /**场景一半高宽*/
    GameConst.HalfStageWidth = GameConst.StageWidth / 2;
    GameConst.HalfStageHeight = GameConst.StageHeight / 2;
    /**怪物种类*/
    GameConst.SkinKindCount = 7;
    /**IP*/
    GameConst.IP = "192.168.1.50";
    //public static IP: string = "192.168.1.32";
    /**端口号*/
    GameConst.PORT = 12345;
    //public static PORT: number = 8901;
    /**方块初始重量*/
    GameConst.rectInitWeight = 10;
    /**玩家初始半径*/
    GameConst.playerInitRadius = 20;
    /**玩家初始重量*/
    GameConst.playerInitWeight = 10;
    /**玩家最小速度*/
    GameConst.playerMinSpeed = 1;
    /**玩家最大速度*/
    GameConst.playerMaxSpeed = 3;
    /**半径增大比例*/
    GameConst.addRaduisRate = 0.3;
    /**速度减少比例*/
    GameConst.addSpeedRate = 0.0007;
    /**泡泡初始宽度*/
    GameConst.paopaoInitWidth = 10;
    /**发送吐泡泡技能的体重限制*/
    GameConst.tuPaoPaoWeightLimit = 20;
    /**泡泡的重量*/
    GameConst.paopaoWeight = 10;
    /**泡泡向前移动距离*/
    GameConst.paopaoMoveDis = 200;
    /**达到重量才能使用分裂技能*/
    GameConst.fenlieLimit = 20;
    /**分裂时，分身向前移动距离*/
    GameConst.fenlieMoveDis = 200;
    /**分裂时，分身移动时间*/
    GameConst.fenlieTime = 200;
    /**当拥有孢子总数小于等于该数时，允许分裂*/
    GameConst.fenlieMax = 4;
    return GameConst;
})();
egret.registerClass(GameConst,"GameConst");
