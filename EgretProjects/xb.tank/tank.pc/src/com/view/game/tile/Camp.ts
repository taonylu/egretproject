/**
 *
 * @author 
 *
 */
class Camp extends BaseTile{
    public static NAME:string = "Camp";
    private normal:eui.Image;
    private gameOver:eui.Image;
    private destory:eui.Image;
    private gameOverPos:egret.Point;
    
	public constructor() {
    	super();
    	this.skinName = "CampSkin";
    	this.setType(TileEnum.camp);
    	this.canHit = true;
    	this.canWalk = false;
      this.gameOverPos.x = this.destory.x;
      this.gameOverPos.y = this.destory.y;
      this.reset();
	}
	
	//override
    public beAttacked(target: Bullet): boolean {
        return true;
    }
	
	//override
    public reset(){
        this.setNormal();
    }
	
	public setNormal(){
    	this.normal.visible = true;
    	this.gameOver.visible = false;
    	this.destory.visible = false;
	}
	
	public setGameOver(){
    	this.normal.visible = false;
    	this.gameOver.visible = true;
    	this.destory.visible = true;
    	this.gameOver.x = this.gameOverPos.x;
    	this.gameOver.y = this.gameOverPos.y;
        egret.Tween.get(this.gameOver).to({y:this.gameOverPos.y - 64},1000);
	}
	
	
}
