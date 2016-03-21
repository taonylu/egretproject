/**
 * 中奖表格
 * @author 
 *
 */
class LuckFormPanel extends BaseUI{
    private submitBtn:eui.Image;               //提交
    private closeBtn:eui.Image;                //关闭
    private nameLabel:eui.EditableText;        //名字
    private telLabel:eui.EditableText;         //电话
    private addressLabel:eui.EditableText;     //地址
    
	public constructor() {
        super("LuckFormSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
	}
	
    protected componentCreated(): void {
        super.componentCreated();
    }

    public onEnable() {
        this.reset();
        this.configListeners();
    }

    public onRemove() {
        this.deConfigListeners();
    }
    
    private reset(){
        this.nameLabel.text = "";
        this.telLabel.text = "";
        this.addressLabel.text = "";
    }
    
    private configListeners(){
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSubmitTouch,this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTouch,this);
    }
    
    private deConfigListeners(){
        this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSubmitTouch,this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTouch,this);
    }
    
    private onSubmitTouch(){
        //TODO 提交表格
    }
    
    private onCloseTouch(){
        this.hide();
    }
	
	
}













