/**
 * 游戏规则
 * @author 
 *
 */
class RulePanel extends BaseUI{
    private knowBtn:eui.Image;      //知道了
    
    private scroller:eui.Scroller;  //规则内容滚动条
    private arrow:eui.Image;        //箭头
    
	public constructor() {
    	super("RulePanelSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.scroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
        this.scroller.verticalScrollBar.autoVisibility = false;
        
    }

    public onEnable(): void {
        this.playArrowAnim();
        this.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onKnowBtnTouch, this);
    }

    public onRemove(): void {
        this.stopArrowAnim();
        this.knowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onKnowBtnTouch,this);
    }
    
    private onKnowBtnTouch(){
        this.hide();
    }
    
    private initArrowY;
    private playArrowAnim(){
        this.initArrowY = this.arrow.y;
        egret.Tween.get(this.arrow,{loop:true}).to({y:this.initArrowY - 10},300).to({y:this.initArrowY},300);
    }
    
    private stopArrowAnim(){
        egret.Tween.removeTweens(this.arrow);
        this.arrow.y = this.initArrowY;
    }
	
}
