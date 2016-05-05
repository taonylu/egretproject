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
    
    private countDownTime:number = 3000;
    
	public constructor() {
        super("ResultSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.countDownTime = GameConst.gameConfig.resultCountDown;
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
    
    //设置结果界面 bGameOver true游戏结束  false下一关
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
        if(UserManager.getInstance().getUserNum() == 1){
            this.p2ScoreGroup.visible = false;
        }else{
            this.p2ScoreGroup.visible = true;   
        }
        var p1Score = 0;  //总分
        var p2Score = 0;
        var p1kill = 0;   //本关击杀
        var p2kill = 0;
        for(var i=0;i<4;i++){
            p1Score += totalKillList[0][i]*(i+1)*100;
            p2Score += totalKillList[1][i]*(i+1)*100;
            p1kill += killList[0][i];
            p2kill += killList[1][i];
        }
        this.p1ScoreLabel.text = p1Score + "";
        this.p2ScoreLabel.text = p2Score + "";
        //游戏结束，才能显示击杀和英雄榜
        if(bGameOver) {
            this.rankGroup.visible = true;
            //英雄榜
            this.p1RankHead.loadImg(data.p1RankHeadUrl);
            this.p2RankHead.loadImg(data.p2RankHeadUrl);
            this.rankLabel.text = data.scoreRank + "";
            //击杀榜
            this.p1KillHead.loadImg(data.p1KillHeadUrl);
            this.p2KillHead.loadImg(data.p2KillHeadUrl);
            if(data.p1Kill != "") {
                this.p1Kill0Label.visible = true;
                this.p1Kill1Label.visible = true;
            } else {
                this.p1Kill0Label.visible = false;
                this.p1Kill1Label.visible = false;
            }
            this.p1KillLabel.text = data.p1KillRank + "";
            if(data.p2Kill != "") {
                this.p2Kill0Label.visible = true;
                this.p2Kill1Label.visible = true;
            } else {
                this.p2Kill0Label.visible = false;
                this.p2Kill1Label.visible = false;
            }
            this.p2KillLabel.text = data.p2KillRank + "";
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














