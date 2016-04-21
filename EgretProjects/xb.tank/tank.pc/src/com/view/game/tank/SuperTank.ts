/**
 * 超级强化坦克
 * @author 
 *
 */
class SuperTank extends BaseTank{
    public constructor() {
        super();
        this.reset();
    }

    public reset() {
        var tankSet = MapManager.getInstance().tankSet.superTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime;
        this.type = TankEnum.super;
    }
}
