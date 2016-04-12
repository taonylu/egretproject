/**
 * 结果场景
 * @author 
 *
 */
class ResultScene extends BaseScene{
    private scoreHeadList:Array<ScoreHead> = new Array<ScoreHead>();  //排名123头像
    private rankHeadList:Array<RankHead> = new Array<RankHead>();     //排名1-10头像
    private countDownLabel:eui.EditableText;
    private countDownTimer:egret.Timer = new egret.Timer(1000);
    private countDownLimit:number = 0;
    
	public constructor() {
    	super("ResultSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        //初始化排名123头像
        for(var i=0;i<3;i++){
            this.scoreHeadList.push(this["scoreHead" + i]);
        }
        //初始化排名1-10头像
        for(var i=0;i<10;i++){
            this.rankHeadList.push(this["rankHead" + i]);
        }
        
        this.countDownLimit = GameConst.gameCofig.resultTime;
    }

    public onEnable(): void {
        this.showResult();
    }
    
    public showResult(){
        var data = GameManager.getInstance().gameScene.resultData;
        var gameRankList = data.gameRankList;
        var rankList = data.rankList;
        var gameRankList = data.gameRankList;
        
        //清理123排名
        for(var i=0;i<3;i++){
            this.scoreHeadList[i].clear();
        }
        //显示123排名
        var len = gameRankList.length;
        for(var i=0;i<len;i++){
            var scoreHead:ScoreHead = this.scoreHeadList[i];
            scoreHead.setNameLabel(gameRankList[i].nickName);
            scoreHead.loadImg(gameRankList[i].headUrl);
            scoreHead.setScoreLabel("得分：" + gameRankList[i].score + " 排名：" + gameRankList[i].rank);
        }
        //清理1-10排名
        for(var i=0;i<10;i++){
            this.rankHeadList[i].clear();
        }
        //显示1-10排名
        len = rankList.length;
        for(var i=0;i<len;i++){
            var rankHead:RankHead = this.rankHeadList[i];
            rankHead.setNameLabel(rankList[i].nickName);
            rankHead.setScoreLabel(rankList[i].score);
            rankHead.setRankLabel(i+1);
            rankHead.loadImg(rankList[i].headUrl);
        }
        
        //倒计时
        this.countDownLabel.text = "";
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHander, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    }
    
    private onTimerHander(){
        var count = this.countDownLimit - this.countDownTimer.currentCount; 
        
        if(count <=0){
            this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHander,this);
            this.countDownTimer.stop();
            //清理用户列表
            UserManager.getInstance().clearAllUser();
            //跳转场景
            LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
        }
        this.countDownLabel.text = count + "";
    }
}











