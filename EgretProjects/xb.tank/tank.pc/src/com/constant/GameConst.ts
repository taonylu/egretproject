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

//坦克 0玩家 1普通 2快速 3强化 4超级强化
enum TankEnum {
    player = 0,
    normal = 1,
    fast = 2,
    strong = 3,
    super = 4
}

//道具 0隐身，1枪，2星星，3基地护甲，4命，5手雷，6暂停
enum ItemEnum {
    shield = 0,
    gun = 1,
    star = 2,
    armor = 3,
    life = 4,
    boom = 5,
    pause = 6
}

//地形
enum TileEnum {
    grass = 1,
    wall = 2,
    steel = 3,
    river = 4
}

//坦克行为
enum ActionEnum{
    up = 0,
    down = 1,
    left = 2,
    right = 3,
    stopMove = 4,
    stopShoot = 5,
    shoot = 6
}

//坦克方向
enum DirectionEnum{
    up = 0,
    down = 1,
    left = 2,
    right = 3
}





