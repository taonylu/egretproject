/**
 * 领奖页面
 * @author 
 *
 */
class PrizeScene extends BaseScene{
    private phoneLabel:eui.EditableText;
    private okBtn:eui.Image;
    private http:HttpUtil;
    
	public constructor() {
    	super("PrizeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.phoneLabel.text = "";
    }

    public onEnable(): void {
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch ,this);
    }

    public onRemove(): void {
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOKBtnTouch,this);
    }
    
    private onOKBtnTouch(){
        var patt = /^1\d{10}$/;
        var result = patt.test(this.phoneLabel.text);
        if(result == false) {
            alert("手机号码不正确");
            return;
        }
        
        if(this.http == null){
            this.http = new HttpUtil();
            this.http.completeHandler = this.completeHandler;
            this.http.errorHandler = this.errorHandler;
            this.http.httpMethod = egret.HttpMethod.POST;
        }
        var url: string = "http://node.ekche.com/game/phpFiles/paoku/gameAction.php";
        
        var openid = "openid=" + GameConst.gameConfig.openid;
        var sign = "&sign=" + GameConst.gameConfig.sign;
        var timestamp = "&timestamp=" + GameConst.gameConfig.timestamp;
        var acType = "&acType=" + "sendMobileData";
        var tel = "&tel=" + this.phoneLabel.text;
        var msg: string = openid + sign + timestamp + acType + tel;
        this.http.send(url,msg,this);
        egret.log("sendPrizeHttp:",url,msg);
    }
    
    private completeHandler(res){
        var json = JSON.parse(res);
        var status = json.status;
        var msg = json.msg;
        egret.log("revPrizeHttp:","status:",json.status,"msg:",json.msg);
        
        
        
        //显示提示信息
        var msgBox: MessageBox = GameManager.getInstance().messageBox;
        msgBox.showMsg(msg);
        msgBox.addEventListener("close", function(){
            //显示结果页面
            LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
        },this);
    }
    
    private errorHandler() {
        //显示提示信息
        var msgBox: MessageBox = GameManager.getInstance().messageBox;
        msgBox.showMsg("提交失败");
        msgBox.addEventListener("close",function() {
            //显示结果页面
            LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
        },this);
    }
}







