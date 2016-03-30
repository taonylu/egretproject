/**
 * 排行榜
 * @author 
 *
 */
class RankPanel extends BaseUI{
    private closeBtn:eui.Image;      //关闭按钮
    private myTeamBtn:eui.Image;     //我的团队
    private prizeBtn:eui.Image;      //获奖名单
    
    private myNameLabel0:eui.Label;  //我的团队、排名、得分
    private myNameLabel1:eui.Label;
    private myRankLabel0:eui.Label;
    private myRankLabel1:eui.Label;
    private myScoreLabel0:eui.Label;
    private myScoreLabel1:eui.Label;
    
    private rankGroupList:Array<eui.Group> = new Array<eui.Group>();  //排行榜
    private rankLabelList:Array<eui.Label> = new Array<eui.Label>();
    private nameLabelList:Array<eui.Label> = new Array<eui.Label>();
    private scoreLabelList:Array<eui.Label> = new Array<eui.Label>();
    
    private rankLimit:number = 15;
    
    private http:HttpUtil = new HttpUtil();
    
	public constructor() {
    	super("RankPanelSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
	}
	
    protected componentCreated(): void {
        super.componentCreated();
        
        for(var i=0;i<this.rankLimit;i++){
            this.rankGroupList.push(this["rankGroup" + i]);
            this.rankLabelList.push(this["rankLabel" + i]);
            this.nameLabelList.push(this["nameLabel" + i]);
            this.scoreLabelList.push(this["scoreLabel" + i]);
        } 
    }

    public onEnable() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.myTeamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.myTeamTouch, this);
        this.prizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeTouch, this);
        
        this.isClickMyTeam = false;
        this.sendMyTeamRequest();
    }   

    public onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtnTouch,this);
        this.myTeamBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.myTeamTouch,this);
        this.prizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPrizeTouch,this);
    }
    
    private onCloseBtnTouch(){
        this.hide();
        GameManager.getInstance().homeScene.rankGroup.visible = true;
    }
    
    //我的团队
    private isClickMyTeam:boolean;  //是否点击我的团队
    private myTeamData ;            //我的团队数据
    
    private myTeamTouch(){
        this.isClickMyTeam = true;
        if(this.myTeamData){
            this.showMyTeam(this.myTeamData);
        }else{
            this.sendMyTeamRequest();
        }
        
    }
    
    //获奖名单
    private onPrizeTouch(){
        GameConst.prizeLastView = this;
        GameManager.getInstance().homeScene.sendPrizeRequest();
    }
    
    public setView(data){
        //移除之前的
        for(var i = 0;i < this.rankLimit;i++) {
            this.rankLabelList[i].text = "";
            this.nameLabelList[i].text = "";
            this.scoreLabelList[i].text = "";
        } 
        this.myNameLabel0.text = "";
        this.myNameLabel1.text = "";
        this.myRankLabel0.text = "";
        this.myRankLabel1.text = "";
        this.myScoreLabel0.text = "";
        this.myScoreLabel1.text = "";
        
        //显示新的
        var len = data.length;
        len = (len > 15)?15:len;
        for(var i=0;i<len;i++){
            var teamName = data[i].teamName;
            var teamScore = data[i].teamScore;
            
            this.rankLabelList[i].text = (i+1) + "";
            this.nameLabelList[i].text = teamName + "";
            this.scoreLabelList[i].text = teamScore + "";
        }
    }

    //发送我的团队请求
    private sendMyTeamRequest(){
        egret.log("sendMyTeamRequest");
        if(GameConst.debug) {
            var json = {
                status: true,
                code: 200,
                msg: "a",
                data:[
                    {teamName:"A",totalScore:"1",member:[
                                                            {headImg:"",nickName:"A",score:"1"},
                                                            { headImg: "",nickName: "A",score: "1" },
                                                            { headImg: "",nickName: "A",score: "1" }
                                                        ]},
                    {teamName: "B",totalScore: "1",member: [
                                                            { headImg: "",nickName: "A",score: "1" },
                                                            { headImg: "",nickName: "A",score: "1" },
                                                            { headImg: "",nickName: "A",score: "1" }
                                                            ]}
                ]
            }
            this.revMyTeam(JSON.stringify(json));
        } else {
            //清理之前数据
            this.myTeamData = null;
            
            this.http.completeHandler = this.revMyTeam;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url: string = window["httpUrl"] + "teammembers";
            var msg: string = "_csrf=" + GameConst.csrf;
            this.http.send(url,msg,this);
        }
    }
    
    private revMyTeam(res){
        egret.log("revMyTeam:",res);
        var json = JSON.parse(res);
        var status = json.status; //true , false
        var code = json.code;     //200成功
        var msg = json.msg;       //描述消息
        var data = json.data;
        if(status == true && code == 200){
            
            this.myTeamData = data;  //保存我的团队信息
            
            if(this.isClickMyTeam){   //点击我的团队，则跳转页面
               this.showMyTeam(data);
            }else{
                var team;
                if(data[0]){
                    team = data[0];
                    this.myNameLabel0.text = team.teamName;
                    this.myRankLabel0.text = team.rank;
                    this.myScoreLabel0.text = team.totalScore; 
                }
                if(data[1]) {
                    team = data[1];
                    this.myNameLabel1.text = team.teamName;
                    this.myRankLabel1.text = team.rank;
                    this.myScoreLabel1.text = team.totalScore;
                }
                
            }
            
        }else{
            alert(msg);
        }
    }
    
    //显示我的团队面板
    public showMyTeam(data){
        this.hide();
        var myTeamPanel: MyTeamPanel = GameManager.getInstance().myTeamPanel;
        LayerManager.getInstance().clearPopLayer();
        LayerManager.getInstance().popLayer.addChild(myTeamPanel);
        myTeamPanel.setView(data);
    }
    
}







