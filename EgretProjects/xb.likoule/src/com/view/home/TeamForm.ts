/**
 * 创建团队
 * @author 
 *
 */
class TeamForm extends BaseUI{
    private closeBtn:eui.Image;            //关闭
    private submitBtn:eui.Image;           //提交
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
    
    //提交
    private onSubmitBtnTouch(){
        //TPDO 提交信息
        if(GameConst.debug){
            var json = {status:true,code:200,msg:"abc"};
            this.revSubmit(JSON.stringify(json));
        }else{
            this.http.completeHandler = this.revSubmit;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url: string = "http://wx.mcw9.com/ricolazt/saveinfo";
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
        this.hide();
        alert(msg);
    }
}











