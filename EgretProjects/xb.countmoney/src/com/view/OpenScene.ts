/**
 * 拆红包场景
 * @author 
 *
 */
class OpenScene extends BaseScene{
    private openGroup: eui.Group;      //拆红包容器
    private openBg: eui.Image;         //拆红包背景
    private openBtn: eui.Rect;         //拆红包按钮
    
    private openedGroup: eui.Group;    //已拆开红包容器
    private openedBg:eui.Image;        //已拆开红包背景
    private ruleBtn:eui.Rect;          //领奖须知，已拆开红包
    private myPrizeBtn:eui.Rect;      //我的奖品
    private againBtn: eui.Rect;        //再拆一次
    private prizeResultLabel:eui.Label;//恭喜你抽中文本
    
    private shareBtn:eui.Image;        //分享按钮
    private initShareBtnY: number;     //初始分享按钮位置
    
    private phoneGroup:eui.Group;         //手机Group
    private phoneLabel:eui.EditableText;  //输入手机号码
    private submitBtn:eui.Rect;           //提交手机号码
    private phoneRect:eui.Rect;           //手机号码半透明背景
    
    private prizeList:Array<eui.Image> = []; //奖品图片数组

    
    private curPrizeImg: eui.Image;        //当前显示的礼物
    private initPrizeImgY: number;
    
	public constructor() {
    	super("OpenSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initShareBtnY = this.shareBtn.y;
        
        for(var i:number = 0; i<8;i++){  //奖品图片名prize1-prize8
             this.prizeList.push(this["prize" + (i + 1)]);
            this.prizeList[i].touchEnabled = false;
            this.prizeList[i].visible = false;
        }
    }

    public onEnable(): void {
        this.openGroup.visible = true;
        this.openedGroup.visible = false;
        this.phoneGroup.visible = false;
        this.phoneLabel.prompt = "请输入手机号码";
        this.prizeResultLabel.text = "";
        //分享按钮动画
        egret.Tween.get(this.shareBtn,{ loop: true }).to({ y: this.initShareBtnY + 15 },500).to({ y: this.initShareBtnY },500);
        
        //监听
        this.configListeners();
    }

    public onRemove(): void {
        egret.Tween.removeTweens(this.shareBtn);
        this.deConfigListeners();
    }
    
    private configListeners():void{
        this.openBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openBtnTouch,this);
        this.myPrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMyPrizeTouch,this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRuleBtnTouch,this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openBtnTouch,this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouch, this);
        //this.phoneRect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPhoneRectTouch,this);
        
    }
    
    private deConfigListeners():void{
        this.openBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.openBtnTouch,this);
        this.myPrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMyPrizeTouch,this);
        this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRuleBtnTouch,this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.openBtnTouch,this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
        this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSubmitBtnTouch,this);
        //this.phoneRect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPhoneRectTouch,this);
    }
    
    //拆红包按钮
    private openBtnTouch():void{
        //测试
        this.deConfigListeners();
        
        //红包晃动
        egret.Tween.get(this.openBg,{loop:true}).to({rotation:this.openBg.rotation+5},50).
            to({rotation:this.openBg.rotation-5},50);
        
        //测试
//        this.showPrize(1, "iphone");
//        return;
            
        //发送请求
        var http:SingleHttp = SingleHttp.getInstance();
        http.completeHandler = this.revOpenPrize;
        http.errorHandler = this.onOpenPrizeError;
        var pass:string = window["pass"];

        var url: string = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/xbLottery" + "/pass/" + pass;
        var msg: string = "";
        http.send(url,egret.HttpMethod.GET,msg, this);
    }
    
    //接收打开红包结果
    private revOpenPrize(result: any): void {
        this.configListeners();
        egret.Tween.removeTweens(this.openBg);
        this.openBg.rotation = 0;

        var json = JSON.parse(result);
        
        egret.log("奖品ID:"+ json.prizeid,"奖品名:"+ json.msg);
        
        if(json.code == "200"){  //成功
            window["pass"] = json.pass;
            this.showPrize(json.prizeid,json.msg);
        }else{   //失败
            
            GameManager.getInstance().shareUI.show();
        }
        
       
    }
    
    //打开红包错误
    private onOpenPrizeError(e: egret.IOErrorEvent): void {
        this.configListeners();
        egret.Tween.removeTweens(this.openBg);
        this.openBg.rotation = 0;
        alert("链接已失效");
    }
    
    //第一次拆红包，显示手机号，第二次拆，则不显示手机号
    private bSubmit:Boolean = false;
    
    //拆红包成功，显示奖品
    private showPrize(prizeid:number, prizeName:string):void{
        //显示拆开红包
        this.openGroup.visible = false;
        this.openedGroup.visible = true;
        
        //显示奖品
        if(this.curPrizeImg){
            this.curPrizeImg.visible = false;
            this.curPrizeImg.y = this.initPrizeImgY;
        }
        this.curPrizeImg = this.prizeList[prizeid-1];  //奖品id1-8，数组下标0-7
        this.initPrizeImgY = this.curPrizeImg.y;
        this.curPrizeImg.y += 300;
        this.curPrizeImg.visible = true;
        egret.Tween.get(this.curPrizeImg).to({y:this.initPrizeImgY},1000);
        //显示奖品名称
        this.prizeResultLabel.text = "获得" + prizeName;
        
        
        //测试 过一段时间出现提交手机号
        if(this.bSubmit == false){
            this.bSubmit = true;
            var self: OpenScene = this;
            egret.Tween.get(this).wait(1000).call(function() {
                self.phoneGroup.visible = true;
            },this);
        }
        
    }
    
    //点击我的奖品
    private onMyPrizeTouch():void{
        
        this.deConfigListeners();
        
        //测试
//        GameManager.getInstance().myPrizeUI.show([{"prizenum":7,"prizemsg":"123"},{"prizenum":8,"prizemsg":"321"}]);
//        return;
        
        var http:SingleHttp = SingleHttp.getInstance();
        http.completeHandler = this.revMyPrize;
        http.errorHandler = this.onMyPrizeError;
        var url: string = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/prizeList";
        var msg: string = "";
        http.send(url,egret.HttpMethod.GET,msg,this);     
    }
    
    //接收我的奖品请求结果
    private revMyPrize(result:any){
        this.configListeners();
        
        var json = JSON.parse(result);
        
        for(var item in json){
            egret.log("查看奖品:" + json[item].prizenum, json[item].prizemsg);
        }
        
        GameManager.getInstance().myPrizeUI.show(json);
    }
    
    //我的奖品请求错误
    private onMyPrizeError(e:egret.IOErrorEvent){
        this.configListeners();
        console.log("请求错误");
    }
    
    //点击奖品须知
    private onRuleBtnTouch(): void {
        GameManager.getInstance().ruleUI.show();
    }

    
    //分享按钮
    private onShareBtnTouch():void{
        GameManager.getInstance().shareUI.show();
    }
    
    //提交手机号码
    private onSubmitBtnTouch():void{
        egret.log("提交号码:" + this.phoneLabel.text);

        var patt = /^1\d{10}$/;
        var result = patt.test(this.phoneLabel.text);
        if(result == false) {
            alert("手机号码不正确");
            return;
        }
        
        this.deConfigListeners();
        
        var http: SingleHttp = SingleHttp.getInstance();
        http.completeHandler = this.submitComplete;
        http.errorHandler = this.submitError;
        var url: string = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/addTel/tel/" + this.phoneLabel.text;
        var msg: string = "";
        http.send(url,egret.HttpMethod.GET,msg,this);
        
        
        
        //超时
        var self:OpenScene = this;
        egret.Tween.get(this.submitBtn).wait(3000).call(function(){
            self.configListeners();
            });
    }
    
    //提交完成
    private submitComplete(result:any):void{
        egret.Tween.removeTweens(this.submitBtn);
        this.configListeners();
        
        GameConst.phone = this.phoneLabel.text;
        //egret.localStorage.setItem("gzrb", this.phoneLabel.text);
        
        this.phoneGroup.visible = false;
        
        var json = JSON.parse(result);
        alert(json.msg);
    }
    
    //提交失败
    private submitError(e:egret.IOErrorEvent):void{
        egret.Tween.removeTweens(this.submitBtn);
        this.configListeners();
        this.phoneGroup.visible = false;   
        alert("链接已失效");
    }
    
    //点击手机背景
    private onPhoneRectTouch():void{
        this.phoneGroup.visible = false;
        this.configListeners();
    }
    
    //分享成功后，发送分享次数请求
    public sendAddChance():void{
        //超时增加监听
        this.deConfigListeners();
        var self:OpenScene = this;
        egret.Tween.get(this.shareBtn).wait(3000).call(function(){
            self.configListeners();
            });

        var http:SingleHttp = SingleHttp.getInstance();
        http.completeHandler = this.revShareResult;
        http.errorHandler = this.revShareError;
        var pass:string = window["pass"];
        var url: string = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/addLottery/pass/" + pass;
        var msg:string = "";
        http.send(url, egret.HttpMethod.GET, msg, this);

    }
    
    //接收分享成功后
    private revShareResult(result:any){
        this.configListeners();
        
        var json = JSON.parse(result);
        
        egret.Tween.removeTweens(this.shareBtn);
        if(json.code == "200"){
            window["pass"] = json.pass;
            GameManager.getInstance().shareUI.hide();
            alert(json.msg);
        }else{
            GameManager.getInstance().shareUI.show();
            alert(json.msg);
        }
        
    }
    
    //请求失败
    private revShareError():void{
        this.configListeners();
        egret.Tween.removeTweens(this.shareBtn);
        alert("增加拆红包次数失败");
    }
}














