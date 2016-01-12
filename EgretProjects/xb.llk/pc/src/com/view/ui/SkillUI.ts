/**
 * 游戏场景，谁对谁施放了技能
 * @author 
 *
 */
class SkillUI extends BaseUI{
    private toolLabel:eui.Label;
    private headGroup0:eui.Group;
    private headGroup1: eui.Group;
    
	public constructor() {
    	super("SkillUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
    
    /**
     * @headImg0  施放道具玩家头像
     * @headImg1 被施放道具玩家头像
     * @toolName 道具名称
     */ 
    public setSkill(headImg0:egret.Bitmap, headImg1:egret.Bitmap, toolName:string){
        this.toolLabel.text = toolName;
        this.headGroup0.addChild(headImg0);
        this.headGroup1.addChild(headImg1);
    }
    
    //清理文本和移除头像
    public clear(){
        this.toolLabel.text = "";
        var headImg:egret.DisplayObject = this.headGroup0.getChildAt(0);
        if(headImg){
            headImg.parent && headImg.parent.removeChild(headImg);
        }
        headImg = this.headGroup1.getChildAt(0);
        if(headImg) {
            headImg.parent && headImg.parent.removeChild(headImg);
        }
    }
}
