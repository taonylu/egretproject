/**
 * 玩家坦克
 * @author 
 *
 */
class PlayerTank extends BaseTank{
    
	public constructor() {
        super("player",0,1);
    	  this.reset();
	}
	
	public reset(){
        this.speed = 4;
        this.power = 1;
        this.life = 1;
        this.shootTime = 0.5;
        this.type = TankEnum.player;
	}
}
