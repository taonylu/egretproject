/**
*  文 件 名：GameConfig.ts
*  功    能： 游戏配置
*  内    容： 资源组名，游戏内字符串
*  作    者： Rikimaru
*  生成日期：2015/8/21
*  修改日期：2015/8/21
*  修改日志：
*/
var GameConfig = (function () {
    function GameConfig() {
    }
    var __egretProto__ = GameConfig.prototype;
    //-----------------------[资源组名 GroupName]-----------------
    /**预加载界面*/
    GameConfig.GN_Preload = "preload";
    /**活动界面*/
    GameConfig.GN_Activity = "activity";
    /**主页界面*/
    GameConfig.GN_Home = "home";
    /**选关界面*/
    GameConfig.GN_through = "through";
    /**游戏界面*/
    GameConfig.GN_Game = "game";
    //-----------------------[场景类名 SceneName]-----------------
    /**预加载界面*/
    GameConfig.SN_Preload = "PreloadScene";
    /**活动界面*/
    GameConfig.SN_Activity = "ActivityScene";
    /**主页界面*/
    GameConfig.SN_Home = "HomeScene";
    /**加载界面A activity->home*/
    GameConfig.SN_LoadingA = "LoadingSceneA";
    /**选关界面*/
    GameConfig.SN_Through = "ThroughScene";
    /**游戏界面*/
    GameConfig.SN_Game = "GameScene";
    //-----------------------[字符串配置]-----------------
    /**预加载界面，产品信息*/
    GameConfig.Text_ProductInfo = "学习作品\n作者：Rikimaru";
    return GameConfig;
})();
GameConfig.prototype.__class__ = "GameConfig";
/**关卡状态*/
var LevelState;
(function (LevelState) {
    /**未解锁*/
    LevelState[LevelState["NotRead"] = 0] = "NotRead";
    /**已过关*/
    LevelState[LevelState["Read"] = 1] = "Read";
    /**当前关卡*/
    LevelState[LevelState["Cur"] = 2] = "Cur";
})(LevelState || (LevelState = {}));
/**场景过渡动画*/
var STween;
(function (STween) {
    STween[STween["None"] = 0] = "None";
    /**从右边入场*/
    STween[STween["R"] = 1] = "R";
})(STween || (STween = {}));
/**子弹拥有者*/
var Owner;
(function (Owner) {
    Owner[Owner["Enemy"] = 0] = "Enemy";
    Owner[Owner["Hero"] = 1] = "Hero";
})(Owner || (Owner = {}));
