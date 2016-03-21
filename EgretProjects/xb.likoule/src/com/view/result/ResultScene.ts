/**
 * 游戏结果场景
 * @author 
 *
 */
class ResultScene extends BaseScene{
    private scoreGroup:eui.Group;       //分数Group
    private timeLabel:eui.Label;        //时间
    private scoreLabel:eui.Label;       //得分
    private totalScoreLabel:eui.Label;  //总得分
    private grassLabel:eui.Label;       //获得香草
    
    private btnGroup:eui.Group;         //按钮Group
    private teamBtn:eui.Label;          //组队比拼
    private againBtn:eui.Label;         //再玩一次
    private rankBtn:eui.Label;          //排行榜
    
    private luckGroup:eui.Group;        //抽奖Group
    private luckBtn:eui.Image;          //抽奖按钮
    private gridList:Array<PrizeGrid> = new Array<PrizeGrid>();  //抽奖格子列表
    
    
	public constructor() {
    	super("ResultSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }

    public onEnable(): void {
        this.btnGroup.visible = false;
        this.luckGroup.visible = false;
        
        this.configListeners();
    }

    public onRemove(): void {
        this.deConfigListeners();
    }
    
    private configListeners(){
        this.teamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeamBtnTouch, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRankBtnTouch,this);
    }
    
    private deConfigListeners(){
        this.teamBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTeamBtnTouch,this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRankBtnTouch,this);
    }
    
    private onTeamBtnTouch(){
        //TODO 组队比拼
    }
    
    private onAgainBtnTouch() {
        //TODO 再玩一次
    }
    
    private onRankBtnTouch() {
        //TODO 排行榜
    }
    
    //设置场景
    public setSceneValue(time:number,score:number,grass:number){
        this.setTimeLabel(time);
        this.setScoreLabel(score);
        this.setGrasslabel(grass);
    }

    private setTimeLabel(time:number){
        this.timeLabel.text = time + "s";
    }
    
    private setScoreLabel(score:number){
        this.scoreLabel.text = score + "";
        this.totalScoreLabel.text = score + "";
    }
    
    private setGrasslabel(grass:number){
        this.grassLabel.text = grass + "";
    }

}














