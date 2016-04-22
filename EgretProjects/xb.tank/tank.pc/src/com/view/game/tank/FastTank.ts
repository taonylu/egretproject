/**
 * 快速坦克
 * @author 
 *
 */
class FastTank extends BaseTank{
    public static NAME: string = "FastTank";
    public constructor() {
        super();
        this.setMovieClip("fastTank_png","fastTank_json","fastTank");
        this.reset();
    }

    public reset() {
        super.reset();
        var tankSet = MapManager.getInstance().tankSet.fastTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.fast;
        this.gotoAndStop("normal");
    }
}
