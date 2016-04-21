/**
 * 快速坦克
 * @author 
 *
 */
class FastTank extends BaseTank{
    public constructor() {
        super();
        this.reset();
        
    }

    public reset() {
        var tankSet = MapManager.getInstance().tankSet.fastTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime;
        this.type = TankEnum.fast;
    }
}
