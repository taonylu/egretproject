/**
 * 强化坦克
 * @author 
 *
 */
class StrongTank extends BaseTank{
    public static NAME: string = "StrongTank";
    public constructor() {
        super();
        this.setMovieClip("strongTank_png","strongTank_json","strongTank");
        this.reset();
    }
    
    //override  强化坦克动画lvl1 lvl2 haveItem
    public playMoveAnim() {
        if(this.isHaveItem) {
            this.gotoAndPlay("haveItem",-1);
        } else if(this.life == 2){
            this.gotoAndPlay("lvl2",-1);
        }else {
            this.gotoAndPlay("lvl1",-1);
        }
    }
    
    //override
    public reset() {
        super.reset();
        var tankSet = MapManager.getInstance().tankSet.strongTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.strong;
        this.gotoAndStop("lvl2");
    }
}
