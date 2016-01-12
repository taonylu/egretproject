/**
 * 分享UI
 * @author 
 *
 */
class ShareUI extends BaseUI{
    private haveChance:eui.Image;  //有机会，分享可再拆一次
    private noChance:eui.Image;    //无机会拆红包
    
	public constructor() {
    	super("ShareUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
    }
    
    public show():void{
        this.haveChance.visible = true;
        this.noChance.visible = false;
        
        LayerManager.getInstance().popLayer.addChild(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);   
    }
    
    public showNoChange():void{
        this.haveChance.visible = false;
        this.noChance.visible = true;

        LayerManager.getInstance().popLayer.addChild(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);   
    }
    
    public hide():void{
        this.parent && this.parent.removeChild(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);  
    }
    
    private onTouchTap(e:egret.TouchEvent):void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);   
        this.parent.removeChild(this);
    }
}
