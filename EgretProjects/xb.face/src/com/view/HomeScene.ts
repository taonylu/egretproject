/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private rankBtn:eui.Image;       //排行榜
    private winnerListBtn:eui.Image; //获奖名单
    private newTeamBtn:eui.Image;    //我要开团
    private myTeamBtn:eui.Image;     //我的团队
    private ruleBtn:eui.Image;       //游戏规则
    private http:HttpUtil = new HttpUtil(); //请求
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }

    public onEnable(): void {
        this.configListeners();
    }

    public onRemove(): void {
        
    }
    
    /////////////////////////////////////
    //-------------[事件处理]----------------
    /////////////////////////////////////
    private configListeners(){
        this.newTeamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNewTeamTouch, this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtnTouch ,this);
        this.winnerListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWinnerListBtnTouch ,this);
        this.myTeamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMyTeamBtnTouch, this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
        
    }
    
    private deConfigListeners(){
        this.newTeamBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onNewTeamTouch,this);
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRankBtnTouch,this);
        this.winnerListBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onWinnerListBtnTouch,this);
        this.myTeamBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMyTeamBtnTouch,this);
        this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRuleBtnTouch,this);
    }
    
    //我要开团
    private onNewTeamTouch(){
        egret.log("send new team");
        this.http.completeHandler = this.revNewTeam;
        this.http.httpMethod = egret.HttpMethod.POST;
        this.http.send("http://local.yii.com/zhongchouf4/createteam","_csrf=" + GameConst.csrf,this);
    }
    
    private revNewTeam(res){
        egret.log("rev new team:",res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        
        if(code == 200){
            var data = json.data;
            var teamName = data.teamName;
            //TODO 
            
        }else{
           //TODO show error msg   
        }
    }
    
    //排行榜
    private onRankBtnTouch() {
        egret.log("send rank");
        this.http.completeHandler = this.revRank;
        this.http.httpMethod = egret.HttpMethod.POST;
        this.http.send("http://local.yii.com/zhongchouf4/gamerank","_csrf=" + GameConst.csrf,this);
    }
    
    private revRank(res){
        egret.log("rev rank:",res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var data = json.data;
        
        if(code == 200){
            var len = data.length;
            for(var i = 0;i < len;i++) {
                var obj = data[i];
                for(var key in obj) {
                    // key, obj[key]
                }
            }
            //TODO goto rankScene
        }else{
            //TODO show error msg
        }
        
    }
    
    //获奖名单
    private onWinnerListBtnTouch() {
        egret.log("send winners");
        this.http.completeHandler = this.revWinner;
        this.http.httpMethod = egret.HttpMethod.POST;
        this.http.send("http://local.yii.com/zhongchouf4/gamerank","_csrf=" + GameConst.csrf,this);
    }
    
    private revWinner(res){
        egret.log("rev winners:",res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var data = json.data;
        
        if(code == 200){
            var isWinner = data.isWiner;
            var winList = data.winList;
            var len = winList.length;
            for(var i = 0;i < len;i++) {
                var obj = winList[i];
                for(var key in obj) {
                    // key, obj[key]
                }
            }
            //TODO goto winnerScene
        }else{
            //TODO show error msg
        }
        
    }
    
    //我的团队
    private onMyTeamBtnTouch() {
        egret.log("send myTeam");
        this.http.completeHandler = this.revMyTeam;
        this.http.httpMethod = egret.HttpMethod.GET;
        this.http.send("http://local.yii.com/zhongchouf4/teammembers","_csrf=" + GameConst.csrf,this);
    }
    
    private revMyTeam(res){
        egret.log("rev myTeam:",res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        
        if(code == 200){
            var data = json.data;
            for(var key in data) {
                // key， data[key]  
            }
            //TODO goto myteam scene
            //LayerManager.getInstance().runScene(GameManager.getInstance().myTeamScene);
            LayerManager.getInstance().runScene(GameManager.getInstance().editFaceScene);
        }else{
            // show error msg
        }
    }
    
    //游戏规则
    private onRuleBtnTouch() {
        
    }
    

    //接口测试
    public test(){
        
    }
    
    
}















