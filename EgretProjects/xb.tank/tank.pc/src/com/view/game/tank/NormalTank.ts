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
    
    //override  普通坦克动画normal haveItem
    public playMoveAnim() {
        if(this.isHaveItem) {
            this.gotoAndPlay("haveItem",-1);
        } else {
            this.gotoAndPlay("normal",-1);
        }
    }
    
    //override 
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
