/**
 * 结算页面
 * @author 
 *
 */
class ResultScene extends BaseScene{
    private headList:Array<ResultHead> = new Array<ResultHead>(); //结算页面，本次游戏头像
    private head0:ResultHead;
    private head1: ResultHead;
    private head2: ResultHead;
    
    private rankList:Array<RankHead> = new Array<RankHead>();  //排行榜头像、昵称等
    
	public constructor() {
    	super("ResultSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.headList.push(this.head0, this.head1, this.head2);
        for(var i=0;i<10;i++){
            this.rankList.push(this["rank" + i]);
        }
    }

    public onEnable(): void {
        this.showResult(GameManager.getInstance().gameScene.resultData);
    }

    public onRemove(): void {

    }
    
    public showResult(data){
        var scoreList = data.scoreList;
        var rankList = data.rankList;
        
        //清理头像
        var len = this.headList.length;
        for(var i=0;i<len;i++){
            var head:ResultHead = this.headList[i];
            head.clear();
        }
        //显示本次游戏玩家分数
        len = scoreList.length;
        for(var i = 0;i < len;i++) {
            this.headList[i].setNameLabel(scoreList[i].nickName);
            this.headList[i].loadImg(scoreList[i].headUrl);
        }
        
        //清理历史排行
        for(var i = 0;i < 10;i++) {
            var rankHead: RankHead = this.rankList[i];
            rankHead.clear();
        }

        //显示历史排行榜
        len = rankList.length;
        len = (len>10)?10:len;
        for(var i = 0;i < len;i++) {
            var rankData = rankList[i];
            var rankHead:RankHead = this.rankList[i];
            rankHead.setNameLabel(rankData.nickName);
            rankHead.setScoreLabel(rankData.score);
            rankHead.loadImg(rankData.headUrl);
            rankHead.setRankLabel(i+1);
        }
    }
	
}
