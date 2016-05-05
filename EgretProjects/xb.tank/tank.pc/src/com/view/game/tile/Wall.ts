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
         this.setType(TileEnum.wall);
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
        this.reset();
    }
	
	//override 重置方块
	public reset(){
    	 for(var i=0;i<16;i++){
        	 this.wallList[i].visible = true;
    	 }
       this.life = 16;
	}
	
	//因为地图编辑没做一半的方块，这里手动设置砖块只剩哪一半，用于基地附近砖块显示，0上半，1下半，2左半，3右半，4左下，5右下
	public setTileHalf(type){
    	switch(type){
        	case 0:  //显示上半，隐藏下半
        	    for(var i=8;i<16;i++){
            	        this.wallList[i].visible = false;
        	    }
        	    this.life = 8;
        	    break;
        	case 1: //显示下半，隐藏上半
                for(var i = 0;i < 8;i++) {
                    this.wallList[i].visible = false;
                }
                this.life = 8;
        	    break;
    	      case 2: //显示左半，隐藏右半
                for(var i = 0;i < 4;i++) {
                    for(var j = 2;j < 4;j++) {
                        this.wallList[i * 4 + j].visible = false;
                    }
                }
                this.life = 8;
    	          break;
	       case 3:  //显示右半，隐藏左半
                for(var i = 0;i < 4;i++) {
                    for(var j = 0;j < 2;j++) {
                        this.wallList[i * 4 + j].visible = false;
                    }
                }
                this.life = 8;
                break;
           case 4:  //显示左下，隐藏其他
               for(var i = 0;i < 16;i++) {
                   this.wallList[i].visible = false;
               }
               for(var i=2;i<4;i++){
                   for(var j=0;j<2;j++){
                       this.wallList[i*4 + j].visible = true;
                   }
               }
               this.life = 4;
               break;
           case 5:  //显示右下，隐藏其他
               for(var i = 0;i < 16;i++) {
                   this.wallList[i].visible = false;
               }
               for(var i = 2;i < 4;i++) {
                   for(var j = 2;j < 4;j++) {
                       this.wallList[i * 4 + j].visible = true;
                   }
               }
               this.life = 4;
               break;
    	}
	}
	
	
	/**
     * 被攻击
     * @target 子弹
     * @return 返回地形是否被击毁
     */
    public beAttacked(bullet: Bullet): boolean {
        var wall:eui.Image;
        for(var i=0;i<16;i++){
            wall = this.wallList[i]; 
            if(wall.visible == true){
                //转换砖块坐标为bullet所在容器坐标，再计算碰撞半径
                //子弹是横着移动，则计算y范围扩大到32
                if(bullet.speedX != 0){
                    if(Math.abs(this.x + wall.x - 32 - bullet.x) <= 24 && Math.abs(this.y + wall.y - 32 - bullet.y) <= 40) {  //击中
                        wall.visible = false;
                        this.life--;
                    }
                }else{
                  //子弹是竖着移动，则判断x范围扩大到32
                    if(Math.abs(this.x + wall.x - 32 - bullet.x) <= 40 && Math.abs(this.y + wall.y - 32 - bullet.y) <= 24) {  //击中
                        wall.visible = false;
                        this.life--;
                    }
                }
            }
        }
        if(this.life <=0){
            return true;
        }else{
            return false;
        }
        
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
    
    public recycle(){
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(Wall.NAME).returnObject(this);
    }
}













