/**
 *
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private gonglueBtn:eui.Image;  //攻略
    private startBtn:eui.Image;    //开始按钮
    private gonglueGroup:eui.Group;//攻略Group
    
	public constructor() {
    	super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.gonglueGroup.visible = false;;
    }


    public onEnable(): void {
        this.gonglueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGongLueBtnTouch, this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
    }

  
    public onRemove(): void {

    }
    
    private onGongLueBtnTouch(){
        this.gonglueGroup.visible = true;
        this.gonglueGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTouch, this);
    }
    
    private onGroupTouch():void{
        this.gonglueGroup.visible = false;
        this.gonglueGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGroupTouch,this);
    }
    
    private onStartBtnTouch() {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
}

















