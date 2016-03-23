/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private acceptGroup:eui.Group;  //接收邀请Group
    private acceptBtn:eui.Image;    //接收邀请
    private ruleBtn:eui.Image;      //游戏规则
    private acceptLabel:eui.Label;  //邀请文字
    
    private invitFailGroup:eui.Group; //邀请失败Group
    private closeInvitBtn:eui.Image;  //关闭邀请失败按钮
    private invitFailLabel:eui.Label; //邀请失败文本
    
    private beginGroup:eui.Group;    //开始Group
    private beginBtn:eui.Image;      //开始
    private ruleBtn2:eui.Image;      //游戏规则
    private teamBtn:eui.Image;       //组队
    
    public rankGroup:eui.Group;     //排行榜Group
    private rankBtn:eui.Image;       //排行榜
    private prizeBtn:eui.Image;      //获取名单
    
    private http:HttpUtil = new HttpUtil(); //请求
    
    private bFirstEnter:boolean = true;  //首次进入，显示接收请求
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
    
    public onEnable(): void {
        //隐藏
        this.acceptGroup.visible = false;
        this.invitFailGroup.visible = false;
        this.beginGroup.visible = false;
        this.rankGroup.visible = true;
        
        //TODO 根据获取的变量显示Group
        var invitInfo = GameConst.invitInfo;
        if(this.bFirstEnter && invitInfo.isInvit){
            this.bFirstEnter = false;
            this.acceptGroup.visible = true;
            this.acceptLabel.text = invitInfo.nickName + " 邀请你参加" + invitInfo.teamName + "队伍";
        }else{
            this.beginGroup.visible = true;
        }

        this.configListeners();
    }

    public onRemove(): void {
        
    }
    
    private configListeners(){
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }
    
    private deConfigListeners(){
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    private onTouchTap(e:egret.TouchEvent){
        switch(e.target){
            case this.acceptBtn:   //点击接收邀请
                this.sendAcceptRequest();
                break;
            case this.ruleBtn:     //点击游戏规则
            case this.ruleBtn2:
                 this.addChild(GameManager.getInstance().rulePanel);
                break;
            case this.closeInvitBtn:    //关闭邀请失败
                this.invitFailGroup.visible = false;
                this.beginGroup.visible = true;
                break;
            case this.beginBtn:    //点击开始游戏
                if(GameConst.teamName == ""){ //没有队伍时，会发送组队请求
                    this.sendStartGame(); 
                }else{
                    LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
                }
                break;
            case this.teamBtn:     //点击组队，显示分享
                this.sendTeamRequest();
                break;
            case this.rankBtn:     //点击排行榜
                this.sendRankRequest();
                break;
            case this.prizeBtn:    //点击获奖名单
                GameConst.prizeLastView = this;
                this.sendPrizeRequest();
                break;
        }
    }
    
    //发送接收邀请
    private sendAcceptRequest(){
        egret.log("sendAccept,teamName=",GameConst.invitInfo.teamName);
        if(GameConst.debug){
            var json = {
                status:false,
                code:400,
                msg:"失败"
            }
            this.revAccept(JSON.stringify(json));
        }else{
            this.http.completeHandler = this.revAccept;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url: string = "http://wx.mcw9.com/ricolazt/acceptinvitation";
            var msg: string = "_csrf=" + GameConst.csrf + "&teamName=" + GameConst.invitInfo.teamName;
            this.http.send(url,msg,this);
        }
    }
    
    private revAccept(res){
        egret.log("revAccept:",res);
        var json = JSON.parse(res);
        var status = json.status; //true , false
        var code = json.code;     //200成功
        var msg = json.msg;       //描述消息
        
        this.acceptGroup.visible = false;
        
        //接收邀请成功
        if(status == true && code == 200){
            this.beginGroup.visible = true;
            GameConst.teamName = GameConst.invitInfo.teamName;
        //接收邀请失败
        }else{
            GameConst.teamName = "";
            this.invitFailGroup.visible = true;
            this.invitFailLabel.text = msg;
        }
        
    }
    
    //发送开始游戏
    private sendStartGame(){
        egret.log("sendStartGame");
        if(GameConst.debug) {
            var json = { status: true,code: 200,msg: "aa",data: { teamName: "ABCD" } };
            this.revStartGame(JSON.stringify(json));
        } else {
            this.http.completeHandler = this.revStartGame;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url: string = "http://wx.mcw9.com/ricolazt/createteam ";
            var msg: string = "_csrf=" + GameConst.csrf;
            this.http.send(url,msg,this);
        }
    }
    private revStartGame(res){
        egret.log("revStartGame:",res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var data = json.data;
        //创建队伍成功
        if(status == true && code == 200) {
            //获取队伍名
            GameConst.teamName = data.teamName;
            //开始游戏
            LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
            window["tn"] = GameConst.teamName;
            window["nick"] = GameConst.myName;
            window["wxshare"]();
        } else {
            alert(msg);
        }
    }
    
    //发送组队请求
    private sendTeamRequest(){
        egret.log("sendTeam");
        if(GameConst.debug){
            var json = {status:true,code:200,msg:"aa",data:{teamName:"ABCD"}};
            this.revTeam(JSON.stringify(json));
        }else{
            this.http.completeHandler = this.revTeam;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url: string = "http://wx.mcw9.com/ricolazt/createteam ";
            var msg: string = "_csrf=" + GameConst.csrf;
            this.http.send(url,msg,this);
        }
    }
    
    private revTeam(res){
        egret.log("revTeam:",res);
        var json = JSON.parse(res);
        var status = json.status; 
        var code = json.code;    
        var msg = json.msg;     
        var data = json.data;
        //创建队伍成功
        if(status == true && code == 200){
            //获取队伍名
            GameConst.teamName = data.teamName;
            window["tn"] = GameConst.teamName;
            window["nick"] = GameConst.myName;
            window["wxshare"]();
            //显示分享页面
            this.addChild(GameManager.getInstance().sharePanel);
        //创建队伍失败
        }else{
            alert(msg);
        }
    }
    
    //发送排行榜
    public sendRankRequest(){
        
        egret.log("sendRank");
        if(GameConst.debug){
            var json = { status: true,code: 200,data: [{ teamName: "队名1",teamScore: '分数' },{ teamName: "队名2",teamScore: '分数' }]};
            this.revRank(JSON.stringify(json));
        }else{
            this.http.completeHandler = this.revRank;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url: string = "http://wx.mcw9.com/ricolazt/gamerank";
            var msg: string = "_csrf=" + GameConst.csrf;
            this.http.send(url,msg,this);
        }
    }
    
    private revRank(res){
        egret.log("revRank:",res);
        
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var data = json.data;
        //查看排行榜成功
        if(status == true && code == 200) {
            this.rankGroup.visible = false;
            var rankPanel:RankPanel = GameManager.getInstance().rankPanel;
            LayerManager.getInstance().popLayer.addChild(rankPanel);  
            rankPanel.setView(data);
        //查看排行榜失败
        } else {
            this.rankGroup.visible = true;
            alert(msg);
        }
        
    }
    
    //发送获奖名单
    public sendPrizeRequest(){
        egret.log("sendPrize");
        if(GameConst.debug){
            var json = {status:true,code:200,msg:"", 
                data:{weekRank:[{teamName:"ABCD",teamScore:123},{teamName:"BCDE",teamScore:321}],
                rankWin:[{teamName:"EEEE",teamScore:111},{teamName:"BBBB",teamScore:222}]}};
                this.revPrize(JSON.stringify(json));
        }else{
            this.http.completeHandler = this.revPrize;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url: string = "http://wx.mcw9.com/ricolazt/winners";
            var msg: string = "_csrf=" + GameConst.csrf;
            this.http.send(url,msg,this); 
        }
    }
    
    private revPrize(res){
        egret.log("revPrize:",res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var data = json.data;
        
        //查看获奖名单成功
        if(status == true && code == 200) {
            var prizePanel: PrizePanel = GameManager.getInstance().prizePanel;
            LayerManager.getInstance().clearPopLayer();
            LayerManager.getInstance().popLayer.addChild(prizePanel);  
            prizePanel.setView(data);
            
            //查看排行榜失败
        } else {
            alert(msg);
        }
    }
    
    
    
}















