/**
 * 钢铁。
 * @author 
 *
 */
class Steel extends BaseTile{
    public static NAME:string = "Steel";
    public steelList: Array<eui.Image> = new Array<eui.Image>();
    public type: TileEnum = TileEnum.steel;    //类型
    
    public constructor() {
        super();
        this.skinName = "SteelSkin";
        this.setType(TileEnum.steel);
    }
	
    public componentCreated():void {
        super.componentCreated();
        for(var i = 0;i < 4;i++) {
            var steel: eui.Image = this["steel" + i];
            steel.anchorOffsetX = steel.width / 2;
            steel.anchorOffsetY = steel.height / 2;
            steel.x += steel.width / 2;
            steel.y += steel.height / 2;
            this.steelList.push(steel);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.reset();
    }
    
    //override 重置方块
    public reset() {
        for(var i = 0;i < 4;i++) {
            this.steelList[i].visible = true;
        }
        this.life = 4;
        this.canHit = true;
        this.canWalk = false;
    }
	
	/**
     * 被攻击
     * @target 子弹
     * @return 返回击中是否有效 
     */
    public beAttacked(target: Bullet): boolean {
        var steel: eui.Image;
        var len = this.steelList.length;
        for(var i = 0;i < len;i++) {
            steel = this.steelList[i];
            if(steel.visible == true) {
                //转换坐标为bullet所在容器坐标，再计算碰撞半径
                if(Math.abs(this.x + steel.x - 32 - target.x) < 48 && Math.abs(this.y + steel.y - 32 - target.y) < 48) {  //击中
                    steel.visible = false;
                    this.life--;
                }
            }
        }
        if(this.life<=0){
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
        var steel: eui.Image;
        for(var i = 0;i < 4;i++) {
            steel = this.steelList[i];
            if(steel.visible == true) {
                //将墙块坐标换成target容器坐标
                if(Math.abs(this.x + steel.x - 32 - nextX) < (16 + target.hitHalfWidth) && Math.abs(this.y + steel.y - 32 - nextY) < (16 + target.hitHalfWidth)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    public recycle() {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(Steel.NAME).returnObject(this);
    }
}
