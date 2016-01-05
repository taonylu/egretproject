/**
 * 分享UI
 * @author 
 *
 */
class ShareUI extends BaseUI{
    private haveChance:eui.Image;  //有机会，分享可再拆一次
    private noChance:eui.Image;    //已分享4次，无机会拆红包
    
	public constructor() {
    	super("ShareUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
    }
    
    public show():void{
        if(GameConst.haveChance){  //根据是否有机会拆红包，显示不同的分享文字
            this.haveChance.visible = true;
            this.noChance.visible = false;
        }else{
            this.haveChance.visible = false;
            this.noChance.visible = true;
        }
        
        LayerManager.getInstance().popLayer.addChild(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);   
    }
    
    private onTouchTap():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);   
        this.parent.removeChild(this);
    }
}
