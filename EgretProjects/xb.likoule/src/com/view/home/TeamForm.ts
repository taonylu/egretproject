/**
 * 创建团队
 * @author 
 *
 */
class TeamForm extends BaseUI{
    private closeBtn:eui.Image;            //关闭
    private submitBtn:eui.Image;           //提交
    private submitBtn_Black:eui.Image;     //提交黑色按钮
    private nameLabel:eui.EditableText;    //名字
    private telLabel:eui.EditableText;     //电话
    private addressLabel:eui.EditableText; //地址
    
    private http:HttpUtil = new HttpUtil();//http请求
    
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
        this.submitBtn.visible = false;
        this.submitBtn_Black.visible = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtnTouch,this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSubmitBtnTouch,this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    public onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtnTouch,this);
        this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSubmitBtnTouch,this);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }
    
    private onEnterFrame(){
        //检查文本是否填满
        if(this.nameLabel.text == "" || this.telLabel.text == "" || this.addressLabel.text == "" ){
            this.submitBtn_Black.visible = true;
            this.submitBtn.visible = false;
        }else{
            this.submitBtn.visible = true;
            this.submitBtn_Black.visible = false;
        }
    }
    
    private onCloseBtnTouch(){
        this.hide();
        GameManager.getInstance().homeScene.rankGroup.visible = true;
    }
    
    //提交
    private onSubmitBtnTouch(){
        egret.log("sendSubmit");
        //TPDO 提交信息
        if(GameConst.debug){
            var json = {status:true,code:200,msg:"abc"};
            this.revSubmit(JSON.stringify(json));
        }else{
            this.http.completeHandler = this.revSubmit;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url: string = window["httpUrl"] + "saveinfo";
            var csrf: string = "_csrf=" + GameConst.csrf;
            var tel:string = "&tel=" + this.telLabel.text;
            var name:string = "&name=" + this.nameLabel.text;
            var addr:string = "&addr=" + this.addressLabel.text; 
            var msg:string = csrf + tel + name + addr;
            this.http.send(url,msg,this); 
        }
    }
    
    private revSubmit(res){
        egret.log("revSubmit:",res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        
        
        if(status == true && code == 200){
            
        }else{
            alert(msg);
        }
        this.hide();
    }
}











