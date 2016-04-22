/**
 * 强化坦克
 * @author 
 *
 */
class StrongTank extends BaseTank{
    public static NAME: string = "StrongTank";
    public constructor() {
        super();
        this.setMovieClip("strongTank_png","strongTank_json","strongTank");
        this.reset();
    }

    public reset() {
        super.reset();
        var tankSet = MapManager.getInstance().tankSet.strongTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.strong;
        this.gotoAndStop("lvl2");
    }
}
