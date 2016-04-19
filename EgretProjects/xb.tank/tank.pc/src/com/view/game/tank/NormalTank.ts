/**
 * 普通坦克
 * @author 
 *
 */
class NormalTank extends BaseTank{
    public constructor() {
        super("normalTank_png","normalTank_json","normalTank");
        this.reset();
    }

    public reset() {
        this.speed = 4;
        this.power = 1;
        this.life = 1;
        this.shootTime = 0.5;
        this.type = TankEnum.normal;
    }
}
