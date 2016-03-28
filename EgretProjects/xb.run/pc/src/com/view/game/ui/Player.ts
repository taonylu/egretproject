/**
 * 玩家类
 * @author 
 *
 */
class Player extends BaseUI{
    public curTrack:number;   //当前所处的赛道
    public z:number;          //虚拟z轴
    
	public constructor() {
    	super("PlayerSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
}
