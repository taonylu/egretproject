/**
 * 玩家坦克
 * @author 
 *
 */
class PlayerTank extends BaseTank{
    public playerNo:number; //几号玩家
	public constructor() {
      super();
    	this.reset();
	}
    
	public setPlayerNo(no:number){
    	  this.playerNo = no;
        if(this.playerNo == 1) {
            this.addTexture("playerYellow_lvl" + this.power + "_",0,1);
        } else {
            this.addTexture("playerGreen_lvl" + this.power + "_",0,1);
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
        if(this.playerNo == 1){
            this.addTexture("playerYellow_lvl" + this.power + "_",0,1);	
    	}else{
            this.addTexture("playerGreen_lvl" + this.power + "_",0,1);	
    	}
	}
	
	public reset(){
    	var tankSet = MapManager.getInstance().tankSet.playerTank;
        this.speed = tankSet.speed;
        this.power = tankSet.power;
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime;
        this.type = TankEnum.player;
	}
}
