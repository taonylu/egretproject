/**
 * 超级强化坦克
 * @author 
 *
 */
class SuperTank extends BaseTank{
    public constructor() {
        super("superTank",0,1);
        this.reset();
    }

    public reset() {
        this.speed = 8;
        this.power = 1;
        this.life = 3;
        this.shootTime = 0.5;
        this.type = TankEnum.super;
    }
}
