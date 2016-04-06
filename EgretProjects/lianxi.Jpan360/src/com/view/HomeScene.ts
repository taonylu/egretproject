/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{

    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }

    public onEnable(): void {
        var test:SimpleMC = new SimpleMC("P1_png","P1_json","P1");
        test.play(-1);
        this.addChild(test);
    }

    public onRemove(): void {
        
    }

    
}















