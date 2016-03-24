/**
 * 获奖列表
 * @author 
 *
 */
class PrizePanel extends BaseUI{
    private prizeLabel:eui.Label;   //获奖列表文本
    private closeBtn:eui.Image;     //关闭
    private leaderBtn:eui.Image;    //队长来领
    
    private fourLabel:eui.Label;    //四强
    private weekLabelList:Array<eui.Label> = new Array<eui.Label>(); //周榜
    private weekNum:number = 6;    //周榜显示数量
    private weekLabel0:eui.Label;
	public constructor() {
    	super("PrizePanelSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
	}
	
    protected componentCreated(): void {
        super.componentCreated();
        
        for(var i=0;i<this.weekNum;i++){
            this.weekLabelList.push(this["weekLabel" + i]);
        }
    }

    public onEnable() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.leaderBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaderBtnTouch, this);
    }

    public onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtnTouch,this);
        this.leaderBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLeaderBtnTouch,this);
    }
    
    private onCloseBtnTouch(){
        this.hide();
        if(GameConst.prizeLastView == GameManager.getInstance().homeScene){
            GameManager.getInstance().homeScene.rankGroup.visible = true; 
        }else{
            LayerManager.getInstance().popLayer.addChild(GameManager.getInstance().rankPanel);
        }
    }
    
    private onLeaderBtnTouch(){
        this.hide();
        LayerManager.getInstance().popLayer.addChild(GameManager.getInstance().teamForm);
    }
    
    public setView(data){
        //清零显示
        for(var i = 0;i < this.weekNum;i++) {
            this.weekLabelList[i].text = "";
        }
        this.fourLabel.text = "";
        
        //显示周榜和四强
        var weekRank = data.weekRank;
        var rankWin = data.rankWin;
        
        var len = weekRank.length;
        len = (len>6)?6:len;
        len = (len>this.weekNum)?this.weekNum:len;
        for(var i=0;i<len;i++){
            var teamName = weekRank[i].teamName;
            var teamScore = weekRank[i].teamScore;
            this.weekLabelList[i].text = "第" + (i+1) + "周最高奖：" + teamName;
        }
        
        len = rankWin.length;
        len = (len>4)?4:len;
        for(var i=0;i<len;i++){
            this.fourLabel.text += rankWin[i].teamName + " ";
        }
        
    }
}








