/**
 * 墙，分16块
 * @author 
 *
 */
class Wall extends BaseTile{
    public static NAME:string = "Wall";
    public wallList:Array<eui.Image> = new Array<eui.Image>();
    public type: TileEnum = TileEnum.wall;    //类型
    
	public constructor() {
    	super();
      this.skinName = "WallSkin";
    	this.canHit = true;
    	this.canWalk = false;
	}
	
    public componentCreated(): void {
        super.componentCreated();
        for(var i = 0;i < 16;i++) {
            var wall: eui.Image = this["wall" + i];
            wall.anchorOffsetX = wall.width / 2;
            wall.anchorOffsetY = wall.height / 2;
            wall.x += wall.width / 2;
            wall.y += wall.height / 2;
            this.wallList.push(wall);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
	
	//重置方块
	public reset(){
    	 for(var i=0;i<16;i++){
        	 this.wallList[i].visible = true;
    	 }
	}
	
	/**
     * 被攻击
     * @target 子弹
     * @return 返回击中是否有效 
     */
    public beAttacked(bullet: Bullet): boolean {
        var wall:eui.Image;
        var isHit:boolean = false;
        for(var i=0;i<16;i++){
            wall = this.wallList[i]; 
            if(wall.visible == true){
                //转换砖块坐标为bullet所在容器坐标，再计算碰撞半径
                //子弹是横着移动，则计算y范围扩大到32
                if(bullet.speedX != 0){
                    if(Math.abs(this.x + wall.x - 32 - bullet.x) < 24 && Math.abs(this.y + wall.y - 32 - bullet.y) < 40) {  //击中
                        wall.visible = false;
                        isHit = true;
                    }
                }else{
                  //子弹是竖着移动，则判断x范围扩大到32
                    if(Math.abs(this.x + wall.x - 32 - bullet.x) < 40 && Math.abs(this.y + wall.y - 32 - bullet.y) < 24) {  //击中
                        wall.visible = false;
                        isHit = true;
                    }
                }
            }
        }
        return isHit;
    }
    
    //碰撞检测，taraget是子弹或者坦克
    public checkCollision(target): boolean {
        //下一步坐标
        var nextX = target.x + target.speedX;
        var nextY = target.y + target.speedY;
        //目标和地形的半径碰撞
        var wall: eui.Image;
        for(var i=0;i<16;i++){
            wall = this.wallList[i];
            if(wall.visible == true) {
                //将墙块坐标换成target容器坐标
                if(Math.abs(this.x + wall.x - 32 - nextX) < (8 + target.hitHalfWidth) && Math.abs(this.y + wall.y - 32 - nextY) < (8 + target.hitHalfWidth)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    //检查是否地形小块被消灭完
    public checkDie(){
        
    }
    
    public recycle(){
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(Wall.NAME).returnObject(this);
    }
}













