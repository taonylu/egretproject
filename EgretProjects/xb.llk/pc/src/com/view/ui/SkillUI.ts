/**
 * 游戏场景，谁对谁施放了技能
 * @author 
 *
 */
class SkillUI extends BaseUI{
    private toolLabel:eui.Label;
    private headGroup0:eui.Group;
    private headGroup1: eui.Group;
    private staticLabel0:eui.Label;
    private staticLabel1:eui.Label;
    private staticLabel2:eui.Label;
    
	public constructor() {
    	super("SkillUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.staticLabel0.visible = false;
        this.staticLabel1.visible = false;
        this.staticLabel2.visible = false;
    }
    
    /**
     * @headImg0  施放道具玩家头像
     * @headImg1 被施放道具玩家头像
     * @toolName 道具名称
     */ 
    public setSkill(headImg0:egret.Bitmap, headImg1:egret.Bitmap, toolName:string){
        this.staticLabel0.visible = true;
        this.staticLabel1.visible = true;
        this.staticLabel2.visible = true;
        this.toolLabel.text = toolName;
        headImg0.width = 80;
        headImg0.height = 80;
        headImg1.width = 80;
        headImg1.height = 80;
        this.headGroup0.addChild(headImg0);
        this.headGroup1.addChild(headImg1);
    }
    
    //清理文本和移除头像
    public clear(){
        this.toolLabel.text = "";
        this.staticLabel0.visible = false;
        this.staticLabel1.visible = false;
        this.staticLabel2.visible = false;
        var headImg:egret.DisplayObject = this.headGroup0.getChildAt(0);
        if(headImg){
            headImg.parent && headImg.parent.removeChild(headImg);
            headImg = null;
        }
        headImg = this.headGroup1.getChildAt(0);
        if(headImg) {
            headImg.parent && headImg.parent.removeChild(headImg);
            headImg = null;
        }
    }
}
