/**
 * 结果场景
 * @author 
 *
 */
class ResultScene extends BaseScene{
    private scoreHeadList:Array<ScoreHead> = new Array<ScoreHead>();  //排名123头像
    private rankHeadList:Array<RankHead> = new Array<RankHead>();     //排名1-10头像
    
    
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
    }

    public onEnable(): void {
        this.showResult();
    }
    
    public showResult(){
        var data = GameManager.getInstance().gameScene.resultData;
        var scoreList = data.scoreList;
        var rankList = data.rankList;
        var gameRankList = data.gameRankList;
        
        //清理123排名
        for(var i=0;i<3;i++){
            this.scoreHeadList[i].clear();
        }
        //显示123排名
        var len = scoreList.length;
        for(var i=0;i<len;i++){
            var scoreHead:ScoreHead = this.scoreHeadList[i];
            var userVO:UserVO = UserManager.getInstance().getUser(scoreList[i].openid);
            scoreHead.setNameLabel(userVO.nickName);
            scoreHead.loadImg(userVO.headUrl);
            scoreHead.setScoreLabel("得分：" + scoreList[i].score + " 排名：" + gameRankList[i]);
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
        egret.setTimeout(this.onTimerOut,this, 8000);
    }
    
    private onTimerOut(){
        //清理用户列表
        UserManager.getInstance().clearAllUser();
        //跳转场景
        LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
    }
}











