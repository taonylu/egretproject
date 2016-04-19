/**
 * 强化坦克
 * @author 
 *
 */
class StrongTank extends BaseTank{
    public constructor() {
        super("strongTank_png","strongTank_json","strongTank");
        this.reset();
    }

    public reset() {
        this.speed = 8;
        this.power = 1;
        this.life = 2;
        this.shootTime = 0.5;
        this.type = TankEnum.strong;
    }
}
