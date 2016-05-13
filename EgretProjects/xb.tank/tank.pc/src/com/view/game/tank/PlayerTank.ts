/**
 * 玩家坦克
 * @author 
 *
 */
class PlayerTank extends BaseTank{
    public static NAME: string = "PlayerTank";
    public shield:Shield = new Shield();  //护盾
    public birthShieldTime:number = 30;   //出生时护盾循环次数
    public itemShieldTime:number = 0;   //道具护盾持续时间
    
    
	public constructor() {
      super();
      this.setMovieClip("playerYellowTank_png","playerYellowTank_json","playerYellowTank");
    	this.reset();
	}
	
	//override 
    public move() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.shield.parent){
            this.shield.x = this.x;
            this.shield.y = this.y;
        }
    }
    
    //停止移动
    public stopMove(){
        this.stop();
        this.snd.stopMove(this.playerNo);
    }
	
	//播放护盾动画
	public playShield(loopTimes:number){
        if(this.parent){
            this.parent.addChild(this.shield);
            this.shield.x = this.x;
            this.shield.y = this.y;
            this.shield.play(loopTimes);
            this.shield.addEventListener(egret.MovieClipEvent.COMPLETE, this.onShieldComplete, this);
        }
	}
	
	//移除护盾
    private onShieldComplete(){
        this.shield.removeEventListener(egret.MovieClipEvent.COMPLETE,this.onShieldComplete,this);
        this.shield.parent && this.shield.parent.removeChild(this.shield);
    }
    
    //override 被攻击
    public beAttacked(bullet: Bullet):boolean{
        if(this.shield.parent){
            return false;
        }else{
            return super.beAttacked(bullet);
        }
        
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
	
    //override  玩家坦克动画lvl1 lvl2 lvl3
    public playMoveAnim() {
        this.gotoAndPlay("lvl" + this.power,-1);
    }
	
	//override 设置坦克威力，并且改变坦克外形
	public setPower(power:number){
        if(power >= 3) {
            power = 3;
        }
    	if(this.power == power){
        	return;
    	}
    	this.power = power;
      this.gotoAndPlay("lvl" + this.power,-1);
      this.shootTime = MapManager.getInstance().tankSet.playerTank.shootTime[this.power - 1];
	}
	
	//时间道具停止
	public pause(){
    	this.stopMove();
             egret.Tween.get(this,{loop:true}).to({alpha:0.1},200).to({alpha:1},200);
	}
	
	//停止暂停,恢复行动
    public resume(){
    	egret.Tween.removeTweens(this);
    	this.alpha = 1;
	}
	
	
	//override
	public reset(){
        this.snd.stopMove(this.playerNo);
        super.reset();
    	  var tankSet = MapManager.getInstance().tankSet.playerTank;
        this.speed = tankSet.speed;
        this.setPower(tankSet.power);
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.player;
        this.rotation = 0;
        this.direction = DirectionEnum.up;
        this.gotoAndStop("lvl1");
        this.resume();

        var itemSet = MapManager.getInstance().itemSet;
        this.itemShieldTime = Math.round(itemSet.shield * 1000 / 160);  //护盾动画播放一次160ms
        if(this.itemShieldTime <=0){
            this.itemShieldTime = 1;
        }
	}
}
