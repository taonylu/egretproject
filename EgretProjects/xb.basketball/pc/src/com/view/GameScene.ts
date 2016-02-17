/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private ballWang:eui.Image;   //球框
    private ballFrame:eui.Image;  //球网
    private ballPool:ObjectPool = ObjectPool.getPool(Ball.NAME); //篮球对象池
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();

    }

    public onEnable(): void {
        var ball:Ball = this.ballPool.getObject();
        this.addChild(ball);
        ball.play();
    }

    public onRemove(): void {
        
    }

    
}









