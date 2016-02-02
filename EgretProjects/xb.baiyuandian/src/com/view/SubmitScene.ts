/**
 * 提交页面
 * @author 
 *
 */
class SubmitScene extends BaseScene{
    private secLabel: eui.Label;       //使用了多少秒
    private curScoreLabel: eui.Label;  //当前分数
    private telLabel:eui.EditableText;        //电话文本
    private submitBtn:eui.Image;       //提交按钮
    private againBtn:eui.Image;        //重新玩按钮
    private textBg0:eui.Image;
    private textBg1: eui.Image;
    private textBg2: eui.Image;
    private textBgList:Array<eui.Image> = new Array<eui.Image>();
    
    private historyScoreLabel:eui.Label;  //历史最高
    
	public constructor() {
    	super("SubmitSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.textBgList.push(this.textBg0, this.textBg1, this.textBg2);
        this.telLabel.prompt = "请填写手机号码";
    }

    public onEnable(): void {
        this.setScoreLabel();
        this.configListeners();
    }

    public onRemove(): void {
        this.deConfigListeners();
    }
    
    private configListeners(){
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouch, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    }
    
    private deConfigListeners(){
        this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSubmitBtnTouch,this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
    }
    
    private onSubmitBtnTouch(){
        this.submitScore();
    }
    
    private onAgainBtnTouch() {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
    //显示用了多少时间开了多少红包
    private setScoreLabel(){
        this.textBg0.visible = false;
        this.textBg1.visible = false;
        this.textBg2.visible = false;
        this.textBgList[NumberTool.getRandomInt(0,2)].visible = true;
        
        var gameScene: GameScene = GameManager.getInstance().gameScene;
        this.secLabel.text = (gameScene.timeLimit - gameScene.curTime).toString();
        this.curScoreLabel.text = gameScene.score.toString();
        
        GameConst.historyScore = (GameConst.historyScore > gameScene.score)?GameConst.historyScore:gameScene.score;
        this.historyScoreLabel.text = GameConst.historyScore.toString();
    }
    
    //提交积分
    private submitScore() {
        var http: SingleHttp = SingleHttp.getInstance();
        http.completeHandler = this.completeHandler;
        http.errorHandler = this.errorHandler;
        var url: string = "" + window["url"];
        var score: string = "score=" + GameManager.getInstance().gameScene.score;
        var csrf: string = "&_csrf=" + window["_csrf"];
        var tel:string = "&tel=" + this.telLabel.text;
        var msg: string = score + csrf + tel;
        http.send(url,egret.HttpMethod.POST,msg,this);
    }
    
    //返回获奖列表
    private completeHandler(data) {
        console.log("接收返回数据:" + data);
        GameConst.rankJson = JSON.parse(data);
        LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
        
       
    }
    
    //获取获奖列表失败
    private errorHandler() {
        alert("提交地址错误");
    }
     
}








