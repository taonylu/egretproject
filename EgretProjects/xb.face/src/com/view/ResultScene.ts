/**
 * 测试颜值结果场景
 * @author 
 *
 */
class ResultScene extends BaseScene{
    public shareBtn:eui.Image;      //召唤好友
    public ruleBtn:eui.Image;       //游戏规则
    public teamScoreBtn:eui.Image;  //团队成绩
    public winnerListBtn:eui.Image; //获奖名单
    
	public constructor() {
    	super("ResultSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }

    public onEnable(): void {

    }

    public onRemove(): void {

    }
}
