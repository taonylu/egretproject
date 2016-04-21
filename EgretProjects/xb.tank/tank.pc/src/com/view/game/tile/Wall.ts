/**
 * 墙，分16块
 * @author 
 *
 */
class Wall extends BaseUI{
    public wallList:Array<eui.Image> = new Array<eui.Image>();
    public type: TileEnum = TileEnum.wall;    //类型
    public life: number = 0;  //生命值
    public row: number;
    public col: number;
    
	public constructor() {
    	super("WallSkin");
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
                if(Math.abs(wall.x - 32 - target.x) < 40 && Math.abs(wall.y - 32 - target.y) < 40){  //击中
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
        ObjectPool.getPool("Wall").returnObject(this);
    }
}













