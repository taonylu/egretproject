/**
 * 结果面板
 * @author 
 *
 */
class ResultScene extends BaseScene{
    
    private wrongPacket:eui.Image;  //错误的红包
    
    private scoreGroup:eui.Group;   //分数容器
    private textBg0:eui.Image;     //分数文本背景
    private textBg1:eui.Image;
    private textBg2:eui.Image;
    private secLabel:eui.Label;  //使用了多少秒
    private curScoreLabel:eui.Label;  //当前分数
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
    
	public constructor() {
    	super("ResultSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initView();
    }

    public onEnable(): void {
        //初始化
        this.scoreGroup.visible = true;
        this.scoreGroup.y = (GameConst.stage.stageHeight - this.scoreGroup.height)/2;
        this.wrongPacket.visible = false;
        this.resultGroup.visible = false;
        this.textBg0.alpha = 0;
        this.textBg1.alpha = 0;
        this.textBg2.alpha = 0;
        this.secLabel.alpha = 0;
        this.rateLabel.alpha = 0;
        this.curScoreLabel.alpha = 0;
        this.historyScoreLabel.alpha = 0;
        
        //移除头像
        var len: number = this.resultUIList.length;
        for(var i: number = 0;i < len;i++) {
            var result: ResultUI = this.resultUIList[i];
            result.clear();
            result.parent && result.parent.removeChild(result);
        }
        this.resultUIList.length = 0;
        
        //根据输赢显示分数
        var bWin:Boolean = GameManager.getInstance().gameScene.bWin;
        if(bWin == false){
            this.wrongPacket.visible = true;
            this.wrongPacket.alpha = 1;
            var self:ResultScene = this;
            egret.Tween.get(this.wrongPacket).to({alpha:0},2000).call(function(){
                self.showScore();
            },this);
        }else{
            this.showScore();
        }
        
        //监听
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
    }

    public onRemove(): void {
        
    }
    
    private initView(){
       this.validateNow();
       //this.rankScroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
       this.scrollerGroup.y = (GameConst.stage.stageHeight - this.scrollerGroup.height)/2;
    }
    
    private onAgainBtnTouch(){
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
    private onShareBtnTouch() {

    }
    
    //显示分数
    public showScore(){
        var gameScene:GameScene = GameManager.getInstance().gameScene;
        //显示用了多少时间开了多少红包
        this.secLabel.text = (gameScene.timeLimit - gameScene.curTime).toString();
        this.curScoreLabel.text = gameScene.score.toString();
        egret.Tween.get(this.textBg0).to({alpha:1},500);
        egret.Tween.get(this.secLabel).to({alpha:1},500);
        egret.Tween.get(this.curScoreLabel).to({alpha:1},500);
        //显示历史最高
        GameConst.historyScore = (GameConst.historyScore > gameScene.score) ? GameConst.historyScore : gameScene.score;
        this.historyScoreLabel.text = GameConst.historyScore.toString();
        egret.Tween.get(this.textBg1).wait(500).to({ alpha: 1 },500);
        egret.Tween.get(this.historyScoreLabel).wait(500).to({alpha:1},500);
        //显示打败了多少人
        this.rateLabel.text = "99";
        egret.Tween.get(this.textBg2).wait(1000).to({ alpha: 1 },500);
        egret.Tween.get(this.rateLabel).wait(1000).to({ alpha: 1 },500);
        
        //显示结果
        egret.Tween.get(this).wait(2000).call(this.showResult, this);
        
        //访问后端，提交积分，获取排行榜
        this.submitScore();
    }
    
    //显示结果
    private showResult(){
        //隐藏时间和当前次数
        egret.Tween.get(this.textBg0).to({ alpha: 0 },500);
        egret.Tween.get(this.secLabel).to({ alpha: 0 },500);
        egret.Tween.get(this.curScoreLabel).to({ alpha: 0 },500);
        //上移历史最高
        var titleButtom:number = this.titleBg.height - 80;  //110调整距离title位置
        egret.Tween.get(this.scoreGroup).wait(800).to({y:titleButtom},500);
        //显示列表和按钮等
        var self:ResultScene = this;
        egret.Tween.get(this.resultGroup).wait(1300).call(function(){
            self.resultGroup.visible = true;
        });
    }
    
    //提交积分
    private submitScore(){
        var http:SingleHttp = SingleHttp.getInstance();
        http.completeHandler = this.completeHandler;
        http.errorHandler = this.errorHandler;
        var url: string = "";
        var msg: string = "money=" + GameManager.getInstance().gameScene.score;
        http.send(url,egret.HttpMethod.POST,msg,this);
        
        var rankList = [{a:"peter",headUrl:"resource/assets/rule_bg.png"}, 
            {a:"peter",headUrl:"resource/assets/rule_bg.png"},
            { a: "peter",headUrl: "resource/assets/rule_bg.png" },
            { a: "peter",headUrl: "resource/assets/rule_bg.png" },
            { a: "peter",headUrl: "resource/assets/rule_bg.png" },
            { a: "peter",headUrl: "resource/assets/rule_bg.png" },
            { a: "peter",headUrl: "resource/assets/rule_bg.png" },
            { a: "peter",headUrl: "resource/assets/rule_bg.png" },
            { a: "peter",headUrl: "resource/assets/rule_bg.png" },
            { a: "peter",headUrl: "resource/assets/rule_bg.png" }];
            
        var len: number = rankList.length;
        var userInfo;
        var resultUI: ResultUI;
        for(var i: number = 0;i < len;i++) {
            userInfo = rankList[i];
            resultUI = new ResultUI();
            resultUI.setLabel(userInfo.nickName);
            resultUI.setHead(userInfo.headUrl);
            resultUI.y = i * 110;  //resultUI高100
            this.scrollerGroup.addChild(resultUI);
            this.resultUIList.push(resultUI);
        }
    }
    
    //获取获奖列表
    private completeHandler(data){
        var rankList = data.rankList;
        if(rankList){
            var len: number = rankList.length;
            var userInfo;
            var resultUI: ResultUI;
            for(var i: number = 0;i < len;i++) {
                userInfo = rankList[i];
                resultUI = new ResultUI();
                resultUI.setLabel(userInfo.nickName);
                resultUI.setHead(userInfo.headUrl);
                resultUI.y = i*110;  //resultUI高100
                this.scrollerGroup.addChild(resultUI);
                this.resultUIList.push(resultUI);
            }
        }
    }
    
    //获取获奖列表失败
    private errorHandler(){
        console.log("提交分数错误");
    }
    
    
}














