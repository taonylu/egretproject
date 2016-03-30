/**
 * 中奖表格
 * @author 
 *
 */
class LuckForm extends BaseUI{
    private submitBtn:eui.Image;               //提交
    private closeBtn:eui.Image;                //关闭
    private nameLabel:eui.EditableText;        //名字
    private telLabel:eui.EditableText;         //电话
    private addressLabel:eui.EditableText;     //地址
    private prizeLabel:eui.Label;              //中的什么奖
    
    private http:HttpUtil = new HttpUtil();   
    
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
        this.sendSubmitRequest();
    }
    
    private onCloseTouch(){
        this.hide();
        GameManager.getInstance().resultScene.btnGroup.visible = true;
    }
    
    public setView(prizeName:string){
        this.prizeLabel.text = "恭喜你获得" + prizeName;
    }
	
	private sendSubmitRequest(){
        egret.log("sendSubmit");
        if(GameConst.debug) {
            var json = {
                status: true,
                code: 200,
                msg: "aa"
            }
            this.revSubmit(JSON.stringify(json));
        } else {
            this.http.completeHandler = this.revSubmit;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url: string = window["httpUrl"] + "prizeinfo";
            var csrf = "_csrf=" + GameConst.csrf;
            var tel = "&tel=" + this.telLabel.text;
            var name = "&name=" + this.nameLabel.text;
            var addr = "&addr=" + this.addressLabel.text;
            var msg: string = csrf + tel + name + addr;
            this.http.send(url,msg,this);
        }
        egret.log(url);
	}
	
	private revSubmit(res){
        egret.log("revSubmit:",res);
        var json = JSON.parse(res);
        var status = json.status; //true , false
        var code = json.code;     //200成功
        var msg = json.msg;       //描述消息
        var data = json.data; 
        
        //信息填写成功
        if(status == true && code == 200) {
           
        } else {
            alert(msg);
        }
        this.hide();
        GameManager.getInstance().resultScene.btnGroup.visible = true;
	}
}













