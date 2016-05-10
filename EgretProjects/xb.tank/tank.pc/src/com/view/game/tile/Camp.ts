/**
 *
 * @author 
 *
 */
class Camp extends BaseTile{
    public static NAME:string = "Camp";
    private normal:eui.Image;
    private destoryImg:eui.Image;
    private gameOverPos:egret.Point = new egret.Point();
    
	public constructor() {
    	super();
    	this.skinName = "CampSkin";
    	this.setType(TileEnum.camp);
    	this.canHit = true;
    	this.canWalk = false;
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.reset();
    }
	
	//override
    public beAttacked(target: Bullet): boolean {
        if(this.normal.visible){  //当正常状态时，才能被击毁
            return true;
        }else{
            return false;
        }
    }
	
	//override
    public reset(){
        this.setNormal();
    }
	
	public setNormal(){
    	this.normal.visible = true;
      this.destoryImg.visible = false;
	}
	
	public setGameOver(){
    	this.normal.visible = false;
      this.destoryImg.visible = true;
	}
	
	
}
