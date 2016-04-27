/**
 * 快速坦克
 * @author 
 *
 */
class FastTank extends BaseTank{
    public static NAME: string = "FastTank";
    public constructor() {
        super();
        this.setMovieClip("fastTank_png","fastTank_json","fastTank");
        this.reset();
    }
    
    //override  急速坦克动画normal haveItem
    public playMoveAnim(){
        if(this.isHaveItem){
            this.gotoAndPlay("haveItem",-1);
        }else{
            this.gotoAndPlay("normal",-1);
        }
    }
    
    //override
    public reset() {
        super.reset();
        var tankSet = MapManager.getInstance().tankSet.fastTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.fast;
        this.gotoAndStop("normal");
    }
}
