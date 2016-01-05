/**
 * 拆红包场景
 * @author 
 *
 */
class OpenScene extends BaseScene{
    private openGroup: eui.Group;    //拆红包容器
    private openedGroup: eui.Group;  //已拆开红包容器
    
    private openBg:eui.Image;        //拆红包背景
    private openedBg:eui.Image;      //已拆开红包背景
    private shareBtn:eui.Image;      //分享按钮
    
    private openBtn:eui.Rect;        //拆红包按钮
    
    private initShareBtnY:number;
    
	public constructor() {
    	super("OpenSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initShareBtnY = this.shareBtn.y;
    }

    public onEnable(): void {
        this.openGroup.visible = true;
        this.openedGroup.visible = false;
        //分享按钮动画
        egret.Tween.get(this.shareBtn,{ loop: true }).to({ y: this.initShareBtnY + 15 },500).to({ y: this.initShareBtnY },500);
        
        //监听
        this.openBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBtnTouch, this);
    }

    public onRemove(): void {
        egret.Tween.removeTweens(this.shareBtn);
        this.openBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.openBtnTouch,this);
    }
    
    //拆红包按钮
    private openBtnTouch():void{
        //发送拆红包请求
        
    }
    
    //接收拆红包结果
    public revOpenRequest():void{
        
    }
    
    
}














