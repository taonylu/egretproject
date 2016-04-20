/**
 * 快速坦克
 * @author 
 *
 */
class FastTank extends BaseTank{
    public constructor() {
        super("fastTank",0,1);
        this.reset();
        
    }

    public reset() {
        this.speed = 8;
        this.power = 1;
        this.life = 1;
        this.shootTime = 0.5;
        this.type = TankEnum.fast;
    }
}
