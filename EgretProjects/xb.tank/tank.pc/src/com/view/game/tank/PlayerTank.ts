/**
 * 玩家坦克
 * @author 
 *
 */
class PlayerTank extends BaseTank{
    public static NAME: string = "PlayerTank";
    public playerNo:number; //几号玩家
	public constructor() {
      super();
      this.setMovieClip("playerYellowTank_png","playerYellowTank_json","playerYellowTank");
    	this.reset();
	}
    
	//设置玩家坦克，玩家1黄色坦克，玩家2绿色坦克
	public setPlayerNo(no:number){
    	  this.playerNo = no;
        if(this.playerNo == 1){
            this.setMovieClip("playerYellowTank_png","playerYellowTank_json","playerYellowTank");
        }else{
            this.setMovieClip("playerGreenTank_png","playerGreenTank_json","playerGreenTank");
        }
	}
	
	//设置坦克威力，并且改变坦克外形
	public setPower(power:number){
        if(power >= 3) {
            power = 3;
        }
    	if(this.power == power){
        	return;
    	}
    	this.power = power;
      this.gotoAndPlay("lvl" + this.power,-1);
	}
	
	
	//重置
	public reset(){
        super.reset();
    	  var tankSet = MapManager.getInstance().tankSet.playerTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.player;
        this.rotation = 0;
        this.direction = DirectionEnum.up;
        this.gotoAndStop("lvl1");
	}
}
