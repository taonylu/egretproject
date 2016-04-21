/**
 * 游戏常量
 * @author 
 *
 */
class GameConst {
    /**舞台*/
	public static stage:egret.Stage;
	/**调试模式*/
	public static debug:boolean;
	/**游戏配置*/
    public static gameConfig;
}

//坦克行为
enum ActionEnum {
    up = 0,
    down = 1,
    left = 2,
    right = 3,
    stopMove = 4,
    stopShoot = 5,
    shoot = 6
}