/**
 * 普通坦克
 * @author 
 *
 */
class NormalTank extends BaseTank{
    public constructor() {
        super();
        this.reset();
    }

    public reset() {
        var tankSet = MapManager.getInstance().tankSet.normalTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime;
        this.type = TankEnum.normal;
    }
}
