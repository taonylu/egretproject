/**
 * 拆红包场景
 * @author 
 *
 */
class OpenScene extends BaseScene{
    private openGroup: eui.Group;      //拆红包容器
    private openBg: eui.Image;           //拆红包背景
    private openBtn: eui.Rect;              //拆红包按钮
    
    private openedGroup: eui.Group;  //已拆开红包容器
    private openedBg:eui.Image;       //已拆开红包背景
    private ruleBtn:eui.Rect;                //领奖须知
    private myPrizeBtn:eui.Rect;          //我的奖品
    private againBtn:eui.Rect;              //再拆一次
    
    private shareBtn:eui.Image;          //分享按钮
    private initShareBtnY: number;     //初始分享按钮位置
    
    private ruleUI:RuleUI = new RuleUI();  //领奖须知
    
    private httpUtil:HttpUtil = new HttpUtil(); //请求
    
    
    
	public constructor() {
    	super("OpenSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initShareBtnY = this.shareBtn.y;
    }

    public onEnable(): void {
        this.openGroup.visible = true;
        this.openedGroup.visible = false;
        //分享按钮动画
        egret.Tween.get(this.shareBtn,{ loop: true }).to({ y: this.initShareBtnY + 15 },500).to({ y: this.initShareBtnY },500);
        
        //监听
        this.configListeners();
    }

    public onRemove(): void {
        egret.Tween.removeTweens(this.shareBtn);
        this.deConfigListeners();
    }
    
    private configListeners():void{
        this.openBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openBtnTouch,this);
        this.myPrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMyPrizeTouch,this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRuleBtnTouch,this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
    }
    
    private deConfigListeners():void{
        this.openBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.openBtnTouch,this);
        this.myPrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMyPrizeTouch,this);
        this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRuleBtnTouch,this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
    }
    
    //拆红包按钮
    private openBtnTouch():void{
        //
        this.deConfigListeners();
        
        //红包晃动
        
        //发送请求
        this.httpUtil.completeHandler = this.revOpenPrize;
        this.httpUtil.errorHandler = this.onOpenPrizeError;
        var url: string = "";
        var msg: string = "";
        this.httpUtil.send(url,egret.HttpMethod.POST,msg, this);
    }
    
    //接收打开红包结果
    private revOpenPrize(result: any): void {
        this.configListeners();
        console.log("拆红包结果:" + result);
        
        //测试成功
        this.showPrize();
    }
    
    //打开红包错误
    private onOpenPrizeError(e: egret.IOErrorEvent): void {
        this.configListeners();
       console.log("拆红包错误");
    }
    
    //拆红包成功，显示奖品
    private showPrize():void{
        this.openGroup.visible = false;
        this.openedGroup.visible = true;
        
    }
    
    //点击我的奖品
    private onMyPrizeTouch():void{
        
        this.deConfigListeners();
        
        this.httpUtil.completeHandler = this.revMyPrize;
        this.httpUtil.errorHandler = this.onMyPrizeError;
        var url: string = "";
        var msg: string = "";
        this.httpUtil.send(url,egret.HttpMethod.POST,msg,this);     
    }
    
    //接收我的奖品请求结果
    private revMyPrize(result:any){
        this.configListeners();
        console.log("我的奖品:" + result);
    }
    
    //我的奖品请求错误
    private onMyPrizeError(e:egret.IOErrorEvent){
        this.configListeners();
        console.log("请求错误");
    }
    
    //点击奖品须知
    private onRuleBtnTouch(): void {
        this.ruleUI.show();
    }
    
    //点击再拆一次
    private onAgainBtnTouch(): void {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
    
}














