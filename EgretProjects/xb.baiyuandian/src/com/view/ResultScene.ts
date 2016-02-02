/**
 * 结果面板
 * @author 
 *
 */
class ResultScene extends BaseScene{

    private historyScoreLabel:eui.Label; //历史最高分数
    private rateLabel:eui.Label;  //打败了多少人
    
    private resultGroup:eui.Group; //结果容器
    private titleBg:eui.Rect;  //标题背景
    private linkBtn:eui.Image;
    
    private shareBtn:eui.Image;
    private againBtn:eui.Image;
    private rankScroller:eui.Scroller;
    private scrollerGroup:eui.Group;
    private resultUIList:Array<ResultUI> = new Array<ResultUI>();
    private resultUILimit:number = 10;

    private ruleBtn:eui.Image;
    
    private no1:eui.Image;  //排名1-3
    private no2:eui.Image;
    private no3:eui.Image;
    
	public constructor() {
    	super("ResultSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initView();
    }

    public onEnable(): void {
        this.no1.parent && this.no1.parent.removeChild(this.no1);
        this.no2.parent && this.no2.parent.removeChild(this.no2);
        this.no3.parent && this.no3.parent.removeChild(this.no3);
        
        //监听
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLinkBtnTouch,this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
        
        //显示排行榜
        this.showRank();
    }

    public onRemove(): void {
        //隐藏排行榜
        var len:number = this.resultUIList.length;
        for(var i:number=0;i<len;i++){
            var resultUI:ResultUI = this.resultUIList[i];
            resultUI.clear();
            resultUI.parent && resultUI.parent.removeChild(resultUI);
        }
    }
    
    private initView(){
       this.validateNow();
       this.scrollerGroup.y = (GameConst.stage.stageHeight - this.scrollerGroup.height)/2;
       
       //获取结果UI
       for(var i: number = 0;i < this.resultUILimit;i++){
           var resultUI: ResultUI = new ResultUI();
           resultUI.x = 0;
           resultUI.y = resultUI.height*i;
           this.resultUIList.push(resultUI);
           this.scrollerGroup.addChild(resultUI);
       }
    }
    
    private onAgainBtnTouch(){
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
    private onShareBtnTouch() {
        console.log("分享");
        LayerManager.getInstance().popLayer.addChild(GameManager.getInstance().shareUI);
    }
    
    private onLinkBtnTouch(){
        window.location.href = "http://www.dipo.pro";
    }
    
    private onRuleBtnTouch(){
        LayerManager.getInstance().popLayer.addChild(GameManager.getInstance().ruleUI);
    }
    
    //显示排行榜
    public showRank(){
        var json = GameConst.rankJson;
        
        var rankList = json.rankList;  //获取排行榜列表
        var success: Boolean = json.success;  //是否成功
        var historyScore: number = json.historyScore; //历史最高分数
        var msg: string = json.msg; //错误消息
        var rank: number = json.rank; //自己排名
        var count: number = json.count; //总人数
        
        egret.log("rankList:",rankList);
        egret.log("success:",success);
        egret.log("msg:",msg);
        egret.log("rank:",rank);
        egret.log("count:",count);
        egret.log("history:",historyScore);

        if(success != true) {
            alert(msg);
            return;
        }

        if(rankList) {
            var len: number = rankList.length;
            len = (len > 10) ? 10 : len;
            var userInfo;
            var resultUI: ResultUI;
            for(var i: number = 0;i < len;i++) {  //最多10名
                userInfo = rankList[i];
                resultUI = this.resultUIList[i];
                resultUI.setScoreLabel(userInfo.score);    //获取玩家分数
                resultUI.setTelLabel(userInfo.headUrl);    //获取玩家头像地址（修改成电话号码）
                resultUI.y = i * 110;
                this.scrollerGroup.addChild(resultUI);
            }
            //显示打败多少人
            if(count <= 1) {
                this.rateLabel.text = "100";
            } else {
                this.rateLabel.text = Math.round((count - rank) / (count - 1) * 100) + "";
            }
            
            //显示历史最高
            if(historyScore < GameConst.historyScore) {
                this.historyScoreLabel.text = GameConst.historyScore + "";
            } else {
                GameConst.historyScore = historyScore;
                this.historyScoreLabel.text = historyScore + "";
            }
            
            //显示no排名小图标
            if(len >= 1) {
                this.scrollerGroup.addChild(this.no1);
            }
            if(len >= 2) {
                this.scrollerGroup.addChild(this.no2);
            }
            if(len >= 3) {
                this.scrollerGroup.addChild(this.no3);
            }

            //分享文案
            var str1 = ["太棒了","太厉害了","真行"];
            var str2 = "!你从财神爷那里开了" + GameConst.historyScore + "个金币,2016年";
            var str3 = ["财运滚滚","财运亨通","日进斗金","和气生财","招财进宝"];
            var str4 = "，打败了" + this.rateLabel.text + "%的西班牙同胞";
            window["shareText"] = str1[NumberTool.getRandomInt(0,2)] + str2 + str3[NumberTool.getRandomInt(0,4)] + str4;
            window["wxshare"]();
        }
    }

    
    
    
    
}














