/**
 * 强化坦克
 * @author 
 *
 */
class StrongTank extends BaseTank{
    public constructor() {
        super();
        this.reset();
    }

    public reset() {
        var tankSet = MapManager.getInstance().tankSet.strongTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime;
        this.type = TankEnum.strong;
    }
}
