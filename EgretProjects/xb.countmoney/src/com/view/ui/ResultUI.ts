/**
 * 结果UI
 * @author 
 *
 */
class ResultUI extends BaseUI{
    private againBtn:eui.Rect;      //再拆一次
    private shareBtn:eui.Rect;      //分享
    private openPacketBtn:eui.Rect; //去拆红包
    private prizeBtn:eui.Rect;      //我的奖品
    
    private countLabel:eui.Label;  //你数了多少个红包文本
    private fightLabel:eui.Label;    //你打败了多少人文本
    private packetLabel:eui.Label;  //红包个数文本
    
    private initShareBtnY:number;   //分享按钮初始位置
    
    
    
	public constructor() {
        super("ResultUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initShareBtnY = this.shareBtn.y;
    }
    
    public showInScene(doc:egret.DisplayObjectContainer, totalPacket:number): void {
        doc.addChild(this);
        
        //分享按钮动画
        egret.Tween.get(this.shareBtn,{loop:true}).to({y:this.initShareBtnY + 15},500).to({y:this.initShareBtnY},500);
        
        this.packetLabel.text = totalPacket.toString();
        this.countLabel.text = "你数了" + totalPacket + "个红包";
        

        var rate: number  = Math.round(totalPacket / 110 * 100);

        if(totalPacket > 150){  //概率区间
            rate = 100;
        }else if(totalPacket > 130){
            rate = 99;
        }else if(totalPacket >= 110){
            rate = 98;
        }
        
        this.fightLabel.text = "你打败了" + rate + "%的人";  //30暂定为最多数红包个数
        
        //监听
        this.configListeners();
    }
    
    public hide(): void {
        //从场景移除
        this.parent && this.parent.removeChild(this);
        
        //停止分享按钮动画
        egret.Tween.removeTweens(this.shareBtn);
        
        //移除监听
        this.deConfigListeners();
    }
    
    private configListeners():void{
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
        this.openPacketBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenBtnTouch,this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
        this.prizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPrizeBtnTouch,this);
    }
    
    private deConfigListeners():void{
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
        this.openPacketBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenBtnTouch,this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
        this.prizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPrizeBtnTouch,this);
    }
    
    
    //再拆一次
    private onAgainBtnTouch():void{
        this.hide();
        GameManager.getInstance().gameScene.startGame();
    }
    
    //去拆红包
    private onOpenBtnTouch(): void {
        this.hide();
        LayerManager.getInstance().runScene(GameManager.getInstance().openScene);
    }
    
    //分享按钮
    private onShareBtnTouch(): void {
        GameManager.getInstance().shareUI.show();
    }
    
    //我的奖品
    private onPrizeBtnTouch(): void {
        
         this.deConfigListeners();
         
          var http:SingleHttp = SingleHttp.getInstance();
          http.completeHandler = this.revMyPrize;
          http.errorHandler = this.onMyPrizeError;
          var url: string = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/prizeList";
          var msg:string = "";
          http.send(url, egret.HttpMethod.GET, msg, this);
    }
    
    //接收我的奖品请求结果
    private revMyPrize(result:any){
        this.configListeners();
        console.log("我的奖品:" + result);
        
        var json = JSON.parse(result);
        var str: string = "";
        for(var item in json) {
            str += json[item].prizemsg + "\n";
        }
        
        GameManager.getInstance().myPrizeUI.show(str);
    }
    
    //接收我的奖品请求结果
    private onMyPrizeError(e: egret.IOErrorEvent) {
        this.configListeners();
        console.log("请求错误");
    }
    
}
















