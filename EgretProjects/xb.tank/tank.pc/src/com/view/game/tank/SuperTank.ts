/**
 * 超级强化坦克
 * @author 
 *
 */
class SuperTank extends BaseTank{
    public static NAME: string = "SuperTank";
    public constructor() {
        super();
        this.setMovieClip("superTank_png","superTank_json","superTank");
        this.reset();
    }

    //override  超级坦克动画lvl1 lvl2 lvl3 haveItem
    public playMoveAnim() {
        if(this.isHaveItem) {
            this.gotoAndPlay("haveItem",-1);
        } else if(this.life == 3) {
            this.gotoAndPlay("lvl3",-1);
        } else if(this.life == 2){
            this.gotoAndPlay("lvl2",-1);
        }else{
            this.gotoAndPlay("lvl1",-1);
        }
    }
    
    //override
    public reset() {
        super.reset();
        var tankSet = MapManager.getInstance().tankSet.superTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.super;
        this.gotoAndStop("lvl3");
    }
}
