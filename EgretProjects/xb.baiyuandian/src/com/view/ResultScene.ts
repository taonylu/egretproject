/**
 * 结果面板
 * @author 
 *
 */
class ResultScene extends BaseScene{
    
    private wrongPacket:eui.Image;  //错误的红包
    
    private scoreGroup:eui.Group;   //分数容器
    private textBg00:eui.Image;     //分数文本背景
    private textBg01:eui.Image;
    private textBg02:eui.Image;
    private textBg0:eui.Image;
    
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
        //初始化
        this.scoreGroup.visible = true;
        this.scoreGroup.y = (GameConst.stage.stageHeight - this.scoreGroup.height)/2;
        this.wrongPacket.visible = false;
        this.resultGroup.visible = false;
        this.textBg00.alpha = 0;
        this.textBg01.alpha = 0;
        this.textBg02.alpha = 0;
        this.textBg1.alpha = 0;
        this.textBg2.alpha = 0;
        this.secLabel.alpha = 0;
        this.secLabel.text = "";
        this.rateLabel.alpha = 0;
        this.rateLabel.text = "";
        this.curScoreLabel.alpha = 0;
        this.curScoreLabel.text = "";
        this.historyScoreLabel.alpha = 0;
        this.historyScoreLabel.text = "";
        
        //随机显示文本
        
        this.textBg0 = this["textBg0" + NumberTool.getRandomInt(0,2)];
        
        //移除头像
        for(var i: number = 0;i < this.resultUILimit;i++){
            var resultUI: ResultUI = this.resultUIList[i];
            resultUI.clear();
            resultUI.parent && this.scrollerGroup.removeChild(resultUI);
        }
        this.no1.parent && this.no1.parent.removeChild(this.no1);
        this.no2.parent && this.no2.parent.removeChild(this.no2);
        this.no3.parent && this.no3.parent.removeChild(this.no3);
        
        
        //根据输赢显示分数
        var bWin:Boolean = GameManager.getInstance().gameScene.bWin;
        if(bWin == false){
            this.wrongPacket.visible = true;
            this.wrongPacket.alpha = 1;
            var self:ResultScene = this;
            egret.Tween.get(this.wrongPacket).wait(1200).to({alpha:0},800).call(function(){
                self.showScore();
            },this);
        }else{
            this.showScore();
        }
        
        //监听
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLinkBtnTouch,this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
    }

    public onRemove(): void {
        
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
    
    //显示分数
    public showScore(){
        //访问后端，提交积分，获取排行榜
        this.submitScore();
        
        var gameScene:GameScene = GameManager.getInstance().gameScene;
        //显示用了多少时间开了多少红包
        this.secLabel.text = (gameScene.timeLimit - gameScene.curTime).toString();
        this.curScoreLabel.text = gameScene.score.toString();
        egret.Tween.get(this.textBg0).to({alpha:1},1000);
        egret.Tween.get(this.secLabel).to({alpha:1},1000);
        egret.Tween.get(this.curScoreLabel).to({alpha:1},1000);
        //显示历史最高
        GameConst.historyScore = (GameConst.historyScore > gameScene.score) ? GameConst.historyScore : gameScene.score;
//        this.historyScoreLabel.text = GameConst.historyScore.toString();
        egret.Tween.get(this.textBg1).wait(1000).to({ alpha: 1 },1000);
        egret.Tween.get(this.historyScoreLabel).wait(1000).to({alpha:1},1000);
        //显示打败了多少人
        //this.rateLabel.text = "";
//        var rate: number = Math.round(GameConst.historyScore / 3000 * 100);
//        if(rate > 100){
//            rate = 100;
//        }
//        this.rateLabel.text = rate.toString();
        egret.Tween.get(this.textBg2).wait(2000).to({ alpha: 1 },1000);
        egret.Tween.get(this.rateLabel).wait(2000).to({ alpha: 1 },1000);
        
        //显示结果
        egret.Tween.get(this).wait(3200).call(this.showResult, this);
        
        
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
        var url: string = "" + window["url"];
        var score: string = "score=" + GameManager.getInstance().gameScene.score;
        var csrf: string = "&_csrf=" + window["_csrf"];
        var sign:string = "&sign=" + window["sign"];
        var msg: string =  score + csrf + sign;
        http.send(url,egret.HttpMethod.POST,msg,this);
    }
    
    //返回获奖列表
    private completeHandler(data){
        console.log("接收返回数据:" + data);
        var json = JSON.parse(data);
        var rankList = json.rankList;  //获取排行榜列表
        var success:Boolean = json.success;  //是否成功
        var historyScore:number = json.historyScore; //历史最高分数
        var msg:string = json.msg; //错误消息
        var rank:number = json.rank; //自己排名
        var count:number = json.count; //总人数

        console.log("rankList:", rankList);
        console.log("success:",success);
        console.log("msg:", msg);
        egret.log("rank:",rank);
        egret.log("count:",count);
        egret.log(GameConst.historyScore);
        
        if(success != true){
            alert(msg);
            return;
        }
      
        
        if(rankList){
            var len: number = rankList.length;
            var userInfo;
            var resultUI: ResultUI;
            for(var i: number = 0;i < len;i++) {
                userInfo = rankList[i];
                resultUI = this.resultUIList[i];
                resultUI.setLabel(userInfo.score);    //获取玩家分数
                resultUI.setHead(userInfo.headUrl); //获取玩家头像地址
                resultUI.y = i * 110;  
                this.scrollerGroup.addChild(resultUI);
            }
            
            //显示打败多少人
            if(count <= 1){
                this.rateLabel.text = "100";
            }else{
                this.rateLabel.text = Math.round((count-rank)/(count-1)*100) + "";
            }
            
            
            //显示历史最高
            if(historyScore < GameConst.historyScore){
                this.historyScoreLabel.text = GameConst.historyScore + "";
            }else{
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
            var str3 = ["财运滚滚","财运亨通","日进斗金","和气生财","招财进宝" ]; 
            var str4 = "，打败了" + this.rateLabel.text + "%的西班牙同胞";
            window["shareText"] = str1[NumberTool.getRandomInt(0,2)] + str2 + str3[NumberTool.getRandomInt(0,4)] + str4;
            window["wxshare"]();
            egret.log(window["shareText"]);
        }
    }
    
    //获取获奖列表失败
    private errorHandler(){
        alert("提交地址错误");
    }
    
    
}














