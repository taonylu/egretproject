/**
 * 超级强化坦克
 * @author 
 *
 */
class SuperTank extends BaseTank{
    public static NAME: string = "SuperTank";
    public constructor() {
        super();
        this.setMovieClip("superTank_png","superTank_json","superTank");
        this.reset();
    }

    public reset() {
        super.reset();
        var tankSet = MapManager.getInstance().tankSet.superTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.super;
        this.gotoAndStop("lvl3");
    }
}
