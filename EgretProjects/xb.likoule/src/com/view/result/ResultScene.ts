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
    
    public btnGroup:eui.Group;         //按钮Group
    private btnMidGroup:eui.Group;     //按钮中间部分，需要背景过长时居中，背景过短时靠右约束，以免挡住商品
    private teamBtn:eui.Label;          //组队比拼
    private againBtn:eui.Label;         //再玩一次
    private rankBtn:eui.Label;          //排行榜
    
    private luckGroup:eui.Group;        //抽奖Group
    private luckBtn:eui.Image;          //抽奖按钮
    private gridList:Array<PrizeGrid> = new Array<PrizeGrid>();  //抽奖格子列表
    private gridNum:number = 8;         //格子数量
    
    private timer:egret.Timer = new egret.Timer(200); //抽奖格子滚动速度
    
    private codeGroup:eui.Group;  //二维码定位用
    
    private code:QRCode; //二维码图片
    
    private http:HttpUtil = new HttpUtil();
    
    
	public constructor() {
    	super("ResultSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        for(var i = 0;i < this.gridNum;i++){
            this.gridList.push(this["grid" + i]); 
        }
        
        //this.code.createCode();
    }

    public onEnable(): void {
        this.scoreGroup.visible = true;
        this.btnGroup.visible = false;
        this.luckGroup.visible = false;
        
        this.configListeners();
        this.reset();
        
        var stageWidth = GameConst.stage.stageWidth;
        var btnMidWidth = this.btnMidGroup.width;
        if(stageWidth >= btnMidWidth){ //背景长时居中
            this.btnMidGroup.x = (stageWidth - btnMidWidth)/2;
        }else{  //背景短时靠右
            this.btnMidGroup.x = stageWidth - btnMidWidth;
        }
        
    }

    public onRemove(): void {
        this.deConfigListeners();
        //隐藏二维码
        //this.code.hideCode();
    }
    
    private configListeners(){
        this.teamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeamBtnTouch, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRankBtnTouch,this);
        this.luckBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLuckBtnTouch,this);  
    }
    
    private deConfigListeners(){
        this.teamBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTeamBtnTouch,this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRankBtnTouch,this);
        this.luckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLuckBtnTouch,this);
    }
    
    private onTeamBtnTouch(){
        this.addChild(GameManager.getInstance().sharePanel);
    }
    
    private onAgainBtnTouch() {
        LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
    }
    
    private onRankBtnTouch() {
        GameManager.getInstance().homeScene.sendRankRequest();
    }
    
    
    private onLuckBtnTouch(){
        this.luckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLuckBtnTouch,this);
        this.sendLuckRequest();
    }
    
    //设置场景
    public setSceneValue(time:number,score:number,grass:number){
        //this.setTimeLabel(time);
        this.setScoreLabel(score);
        this.setGrasslabel(grass);
        
        var luckTime = egret.localStorage.getItem("lkl_luckTime");
        
        if(GameConst.debug){
            luckTime = "false";
        }
        
        if(luckTime == "true"){   //如果已经抽过奖，则不显示抽奖界面
            this.btnGroup.visible = true;
            //this.showCode();
        }else{
            this.luckGroup.visible = true;
        }
        
    }

    private setTimeLabel(time:number){
        //this.timeLabel.text = time + "s";
    }
    
    private setScoreLabel(score:number){
        this.scoreLabel.text = score + "";
        this.totalScoreLabel.text = score + "";
    }
    
    private setGrasslabel(grass:number){
        this.grassLabel.text = grass + "";
    }
    
    //重置界面
    private reset(){
        //重置翻拍
        var len = this.gridList.length;
        for(var i=0;i<len;i++){
            var grid:PrizeGrid = this.gridList[i];
            grid.showBack();
        }
    }
    
    //发送抽奖
    private sendLuckRequest(){
        egret.log("sendLuck");
        if(GameConst.debug) {
            var json = {
                status: true,
                code: 200,
                msg: "aa",
                data: { prizeName:"幸运奖",prizeIndex:5, winMark:"Y"}
            }
            this.revLuck(JSON.stringify(json));
        } else {
            this.http.completeHandler = this.revLuck;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url: string = window["httpUrl"] + "lottery";
            var msg: string = "_csrf=" + GameConst.csrf;
            this.http.send(url,msg,this);
        }
    }
    
    private prizeName;
    private winMark;
    private revLuck(res){
        egret.log("revLuck:",res);
        var json = JSON.parse(res);
        var status = json.status; //true , false
        var code = json.code;     //200成功
        var msg = json.msg;       //描述消息
        var data = json.data; 
        
        //
        if(status == true && code == 200) {
            this.prizeName = data.prizeName;
            this.winMark = data.winMark;
            this.startPlayLuck(data);
            
            
            
        } else {
            alert(msg);
            this.luckGroup.visible = false;
            this.btnGroup.visible = true;
            //this.showCode();
        }
        //本地缓存抽奖
        egret.localStorage.setItem("lkl_luckTime","true");
    }
    
    private timeLimit;
    private startPlayLuck(data){
        this.timeLimit = this.gridNum + data.prizeIndex;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.reset();
        this.timer.start();
        
        this.gridList[0].showLight();
    }
    
    private onTimer(){
        //显示抽奖格子
        var count = this.timer.currentCount%this.gridNum;
        if(count == 0){     
            this.gridList[this.gridNum - 1].showBack();
        }else{
            this.gridList[count - 1].showBack();
        }

        this.gridList[count].showLight();
        
        //时间结束
        if(this.timeLimit == this.timer.currentCount){
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
            
            this.gridList[0].showLuck();
            this.gridList[1].showThx();
            this.gridList[2].showBigLuck();
            this.gridList[3].showThx();
            this.gridList[4].showLuck();
            this.gridList[5].showThx();
            this.gridList[6].showLuck();
            this.gridList[7].showThx();
            this.gridList[count].showLight();
            
            var self:ResultScene = this;
            egret.Tween.get(this).wait(3000).call(function(){
                self.luckComplete();
            },this);
        }
    }
    
    //抽奖结束
    private luckComplete(){
        //获奖
        if(this.winMark == "Y"){
            this.luckGroup.visible = false;
            var luckForm: LuckForm = GameManager.getInstance().luckForm;
            this.addChild(luckForm);
            luckForm.setView(this.prizeName);
        //未获奖
        }else{
            this.luckGroup.visible = false;
            this.btnGroup.visible = true;
           //this.showCode();
        }
    }
    

    //显示二维码
    public showCode(){
        this.code.showCode();
        this.code.setPosition(this.codeGroup.x,this.codeGroup.y);
    }
        

}














