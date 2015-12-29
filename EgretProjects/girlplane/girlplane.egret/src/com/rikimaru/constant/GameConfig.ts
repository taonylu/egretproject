/**
*  文 件 名：GameConfig.ts
*  功    能： 游戏配置
*  内    容： 资源组名，游戏内字符串
*  作    者： Rikimaru
*  生成日期：2015/8/21
*  修改日期：2015/8/21
*  修改日志：
*/
class GameConfig {
    //-----------------------[资源组名 GroupName]-----------------
    /**预加载界面*/
    public static GN_Preload: string = "preload";
    /**活动界面*/
    public static GN_Activity: string = "activity";
    /**主页界面*/
    public static GN_Home: string = "home";
    /**选关界面*/
    public static GN_through: string = "through";
    /**游戏界面*/
    public static GN_Game: string = "game";

    //-----------------------[场景类名 SceneName]-----------------
    /**预加载界面*/
    public static SN_Preload: string = "PreloadScene";
    /**活动界面*/
    public static  SN_Activity: string = "ActivityScene";
    /**主页界面*/
    public static SN_Home: string = "HomeScene";
    /**加载界面A activity->home*/
    public static SN_LoadingA: string = "LoadingSceneA";
    /**选关界面*/
    public static SN_Through: string = "ThroughScene";
    /**游戏界面*/
    public static SN_Game: string = "GameScene";
    
    //-----------------------[字符串配置]-----------------
    /**预加载界面，产品信息*/
    public static Text_ProductInfo: string = "学习作品\n作者：Rikimaru";
    
    
    //-----------------------[屏幕参数 随resize改变]-----------------
    /**舞台宽度*/
    public static stageWidth: number;
    /**舞台高度*/
    public static stageHeight: number;
    
}

/**关卡状态*/
enum LevelState { 
    /**未解锁*/
    NotRead,
    /**已过关*/
    Read,
    /**当前关卡*/
    Cur
}

/**场景过渡动画*/
enum STween { 
    None = 0,
    /**从右边入场*/
    R   
}

/**子弹拥有者*/
enum Owner { 
    Enemy,
    Hero
}















