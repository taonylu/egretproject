/**
 * 游戏常量
 * @author 
 *
 */
class GameConst {
    public static stage: egret.Stage;
    public static totalScore: number = 10000;                   //封顶分数
    public static zheScore: Array<number> = [1000,3000,10000];  //达到相应折扣所需分数
    public static zheList: Array<number> = [9,8.5,8];           //折扣
    public static reduceTime: number;                            //难度提升，方块刷新减少的时间
    public static levelUpTime: number;                          //难度提升间隔时间
    public static refreshTime: number;                          //方块刷新时间
}

enum GameState {
    Free,
    SelectRect,
    WaitCancelRect,
    RefreshRect
}

enum RectColor { 
    Red,
    Blue,
    Green 
};