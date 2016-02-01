/**
 * 规则页面
 * @author  
 *
 */
class RuleUI extends BaseUI{
    private closeBtn: eui.Image;   //关闭按钮
    private jiaohuoBtn:eui.Image; //叫货宝
    
	public constructor() {
    	
    	super("RuleUISkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.jiaohuoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onJiaoHuoBtnTouch,this);
    }
    
    //点击关闭按钮
    private onCloseBtnTouch() {
        this.parent && this.parent.removeChild(this);
    }
    
    //点击叫货宝
    private onJiaoHuoBtnTouch() {
        window.location.href = "http://www.dipo.pro";
    }
}
