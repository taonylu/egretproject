/**
 * 墙，分16块
 * @author 
 *
 */
class Wall extends BaseUI{
    public static NAME:string = "Wall";
    public wallList:Array<eui.Image> = new Array<eui.Image>();
    public type: TileEnum = TileEnum.wall;    //类型
    public life: number = 0;  //生命值
    public row: number;
    public col: number;
    public canHit: boolean = false;  //可以被击中
    public canWalk: boolean = false; //能够行走
    
	public constructor() {
    	super("WallSkin");
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
    public beAttacked(target: Bullet): boolean {
        var wall:eui.Image;
        var isHit:boolean = false;
        for(var i=0;i<16;i++){
            wall = this.wallList[i]; 
            if(wall.visible == true){
                //转换砖块坐标为bullet所在容器坐标，再计算碰撞半径
                if(Math.abs(this.x + wall.x -32 - target.x) < 24 && Math.abs(this.y + wall.y -32 - target.y) < 24){  //击中
                    wall.visible = false;
                    isHit = true;
                }
            }
        }
        return isHit;
    }
    
    public recycle(){
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(Wall.NAME).returnObject(this);
    }
}













