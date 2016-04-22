/**
 * 钢铁。
 * @author 
 *
 */
class Steel extends BaseUI{
    public static NAME:string = "Steel";
    public steelList: Array<eui.Image> = new Array<eui.Image>();
    public type: TileEnum = TileEnum.steel;    //类型
    public life: number = 0;  //生命值
    public row: number;
    public col: number;
    public canHit: boolean = false;  //可以被击中
    public canWalk: boolean = false; //能够行走
    
    public constructor() {
        super("SteelSkin");
        this.canHit = true;
        this.canWalk = false;
    }
	
    public componentCreated(): void {
        super.componentCreated();
        for(var i = 0;i < 4;i++) {
            var steel: eui.Image = this["steel" + i];
            steel.anchorOffsetX = steel.width / 2;
            steel.anchorOffsetY = steel.height / 2;
            steel.x += steel.width / 2;
            steel.y += steel.height / 2;
            this.steelList.push(this["steel" + i]);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    
    //重置方块
    public reset() {
        for(var i = 0;i < 4;i++) {
            this.steelList[i].visible = true;
        }
    }
	
	/**
     * 被攻击
     * @target 子弹
     * @return 返回击中是否有效 
     */
    public beAttacked(target: Bullet): boolean {
        var steel: eui.Image;
        var isHit: boolean = false;
        var len = this.steelList.length;
        for(var i = 0;i < len;i++) {
            steel = this.steelList[i];
            if(steel.visible == true) {
                if(Math.abs(this.x + steel.x - 32 - target.x) < 48 && Math.abs(this.y + steel.y - 32 - target.y) < 48) {  //击中
                    steel.visible = false;
                    isHit = true;
                }
            }
        }
        return isHit; 
    }
    
    public recycle() {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(Steel.NAME).returnObject(this);
    }
}
