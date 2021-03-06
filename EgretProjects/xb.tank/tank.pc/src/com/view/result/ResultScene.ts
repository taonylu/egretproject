/**
 * 结果场景
 * @author 
 *
 */
class ResultScene extends BaseScene{
    private p1ScoreGroup:eui.Group;         //玩家分数容器
    private p2ScoreGroup:eui.Group;
    private historyLabel:eui.BitmapLabel;   //历史最高分
    private stageLabel:eui.BitmapLabel;     //第几关
    private waveLabel:eui.BitmapLabel;      //第几波
    private p1ScoreLabel:eui.BitmapLabel;   //p1分数
    private p2ScoreLabel:eui.BitmapLabel;   //p2分数
    private p1Tank0Label:eui.BitmapLabel;   //p1击毁坦克数量
    private p1Tank1Label:eui.BitmapLabel; 
    private p1Tank2Label:eui.BitmapLabel;  
    private p1Tank3Label:eui.BitmapLabel;  
    private p1Score0Label:eui.BitmapLabel;  //p1击毁坦克得分
    private p1Score1Label: eui.BitmapLabel; 
    private p1Score2Label: eui.BitmapLabel; 
    private p1Score3Label: eui.BitmapLabel; 
    private p2Tank0Label:eui.BitmapLabel;   //p2击毁坦克数量
    private p2Tank1Label:eui.BitmapLabel;
    private p2Tank2Label:eui.BitmapLabel;
    private p2Tank3Label:eui.BitmapLabel;  
    private p2Score0Label: eui.BitmapLabel;  //p2击毁坦克得分
    private p2Score1Label: eui.BitmapLabel;
    private p2Score2Label: eui.BitmapLabel;
    private p2Score3Label: eui.BitmapLabel; 
    private p1TotalLabel:eui.BitmapLabel;   //击毁坦克总数
    private p2TotalLabel:eui.BitmapLabel;
    
    private rankGroup:eui.Group;            //排行榜Group
    private p1RankHead:HeadUI;              //英雄榜头像
    private p2RankHead:HeadUI;
    private p1KillHead:HeadUI;              //击杀榜头像
    private p2KillHead:HeadUI;
    private rankLabel:eui.Label;            //排行榜文本
    private p1Kill0Label:eui.Label;         //击杀文本
    private p1Kill1Label:eui.Label;
    private p1KillLabel:eui.Label;
    private p2Kill0Label: eui.Label; 
    private p2Kill1Label: eui.Label;
    private p2KillLabel: eui.Label;
    
    private countDownTime:number = 10000;
    
	public constructor() {
        super("ResultSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.countDownTime = GameConst.gameConfig.resultCountDown*1000;
    }
    
    public onEnable(){
        window["changeBgColor"](GameConst.color0);
    }
    
    //清理结果页面
    public clear(){
        for(var i = 0;i < 4;i++) {
            this["p1Tank" + i + "Label"].text = "";
            this["p2Tank" + i + "Label"].text = "";
            this["p1Score" + i + "Label"].text = "";
            this["p2Score" + i + "Label"].text = "";
        }
        this.p1TotalLabel.text = "";
        this.p2TotalLabel.text = "";
        this.historyLabel.text = "";
    }
    
    /** 
     *设置结果界面
     *@data 传递参数
     *@bGameOver true游戏结束  false下一关
     *@bEndLess 是否无尽模式
     */  
    public setResult(data, bGameOver:boolean,bEndLess:boolean=false){
        this.clear();
        //历史最高分
        this.historyLabel.text = data.historyScore + "";
        //第几关
        this.stageLabel.text = "STAGE" + data.stage;
        //第几波
        if(bEndLess){
            this.waveLabel.text = "WAVE." + data.wave;
        }else{
            this.waveLabel.text = "";
        }
        //击杀列表
        var killList = data.killList;
        var totalKillList = data.totalKillList;
        //总分
        var userNum = UserManager.getInstance().getUserNum();
        
        if(userNum >= 1){
            this.p1ScoreLabel.text = data.totalScore[0] + "";
            this.p2ScoreGroup.visible = false;
            this.p2ScoreLabel.text = ""; 
        }
        if(userNum == 2){
            this.p2ScoreGroup.visible = true;   
            this.p2ScoreLabel.text = data.totalScore[1] + "";
        }
        var p1kill = 0;   //本关击杀
        var p2kill = 0;
        for(var i=0;i<4;i++){
            p1kill += killList[0][i];
            p2kill += killList[1][i];
        }
        
        //游戏结束，才能显示击杀和英雄榜
        if(bGameOver && data.success == true) {
            this.rankGroup.visible = true;
            //英雄榜
            var userManager:UserManager = UserManager.getInstance();
            var userList = userManager.userList;
            var userNum = userList.length;
            if(userNum >= 1) {
                this.p1RankHead.loadImg(userList[0].headimgurl);
            }
            if(userNum == 2){
                this.p2RankHead.loadImg(userList[1].headimgurl); 
            }
            this.rankLabel.text = data.heroRank + "";
            //击杀榜
            if(userNum >= 1) {
                this.p1KillHead.loadImg(userList[0].headimgurl);
            }
            if(userNum == 2) {
                this.p2KillHead.loadImg(userList[1].headimgurl);
            }
            
            if(data.p1KillRank != 0) {
                this.p1Kill0Label.visible = true;
                this.p1Kill1Label.visible = true;
            } else {
                this.p1Kill0Label.visible = false;
                this.p1Kill1Label.visible = false;
            }
            this.p1KillLabel.text = data.p1KillRank + "";
            if(data.p2KillRank != 0) {
                this.p2Kill0Label.visible = true;
                this.p2Kill1Label.visible = true;
            } else {
                this.p2Kill0Label.visible = false;
                this.p2Kill1Label.visible = false;
            }
            if(userNum == 2){
                this.p2KillLabel.text = data.p2KillRank + "";
            }else{
                this.p2KillLabel.text = "";
            }
            
        } else {
            this.rankGroup.visible = false;
        }
        //击毁坦克数量
        var self:ResultScene = this;
        egret.Tween.get(this).wait(500).call(function(){
            self.p1Score0Label.text = killList[0][0] * 100 + "";
            self.p1Tank0Label.text = killList[0][0] + "";
            self.p2Score0Label.text = killList[1][0] * 100 + "";
            self.p2Tank0Label.text = killList[1][0] + "";
        }).wait(500).call(function(){
            self.p1Score1Label.text = killList[0][1] * 200 + "";
            self.p1Tank1Label.text = killList[0][1] + "";
            self.p2Score1Label.text = killList[1][1] * 200 + "";
            self.p2Tank1Label.text = killList[1][1] + "";
        }).wait(500).call(function() {
            self.p1Score2Label.text = killList[0][2] * 300 + "";
            self.p1Tank2Label.text = killList[0][2] + "";
            self.p2Score2Label.text = killList[1][2] * 300 + "";
            self.p2Tank2Label.text = killList[1][2] + "";
        }).wait(500).call(function() {
            self.p1Score3Label.text = killList[0][3] * 400 + "";
            self.p1Tank3Label.text = killList[0][3] + "";
            self.p2Score3Label.text = killList[1][3] * 400 + "";
            self.p2Tank3Label.text = killList[1][3] + "";
        }).wait(500).call(function() {
            self.p1TotalLabel.text = p1kill + "";
            self.p2TotalLabel.text = p2kill + "";
            }).wait(this.countDownTime).call(function(){
            //游戏结束则回到首页，否则进入下一关
            if(bGameOver){
                MapManager.getInstance().curLevel = 1;
                LayerManager.getInstance().runScene(GameManager.getInstance().homeScene); 
            }else{
                MapManager.getInstance().curLevel += 1;
                LayerManager.getInstance().runScene(GameManager.getInstance().transitionScene); 
            }
        });
    }
    
}














