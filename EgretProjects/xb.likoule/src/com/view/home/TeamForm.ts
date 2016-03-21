/**
 * 创建团队
 * @author 
 *
 */
class TeamForm extends BaseUI{
    private closeBtn:eui.Image;
    private submitBtn:eui.Image;
    private nameLabel:eui.EditableText;
    private telLabel:eui.EditableText;
    private addressLabel:eui.EditableText;
    
	public constructor() {
        super("TeamFormSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
	}
	
    protected componentCreated(): void {
        super.componentCreated();
    }

    public onEnable() {
        this.nameLabel.text = "";
        this.telLabel.text = "";
        this.addressLabel.text = "";
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtnTouch,this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSubmitBtnTouch,this);
    }

    public onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtnTouch,this);
        this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSubmitBtnTouch,this);
    }
    
    private onCloseBtnTouch(){
        this.hide();
    }
    
    private onSubmitBtnTouch(){
        //TPDO 提交信息
    }
}











