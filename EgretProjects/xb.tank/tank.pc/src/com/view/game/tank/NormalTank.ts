/**
 * 普通坦克
 * @author 
 *
 */
class NormalTank extends BaseTank{
    public static NAME: string = "NormalTank";
    public constructor() {
        super();
        this.setMovieClip("normalTank_png","normalTank_json","normalTank");
        this.reset();
    }

    public reset() {
        super.reset();
        var tankSet = MapManager.getInstance().tankSet.normalTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.normal;
        this.gotoAndStop("normal");
    }
}
