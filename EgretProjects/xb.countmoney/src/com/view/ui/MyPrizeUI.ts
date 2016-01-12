/**
 * 我的奖品
 * @author 
 *
 */
class MyPrizeUI extends BaseUI{
    private contentLabel0:eui.Label; //已获得奖品1文本
    private contentLabel1:eui.Label; //已获得奖品2文本
    private okBtn:eui.Rect;   //朕已阅
    private prizeID0:string;  //已获得奖品1的ID
    private prizeID1:string;  //已获得奖品2的ID
    
    
    private detailScroller:eui.Scroller;  //详情页滚动条
    private detailGroup:eui.Group;  //详情页总Group
    private detailList:Array<eui.Group> = new Array<eui.Group>();  //详情页分页Group
    private codeLabel:eui.Label;  //兑换码
    private prizeNum:number= 8;

	public constructor() {
    	super("MyPrizeUISkin");
    	this.percentHeight = 100;
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.detailScroller.bounces = false;
        
        
        //初始化详情页
        this.detailGroup.visible = false;
        for(var i:number=1;i<=this.prizeNum;i++){
            this.detailList.push(this["detail" + i]);
        }
    }
    
    public show(json):void{
        //初始化文本
        this.prizeID0 = "";
        this.prizeID1 = "";
        this.contentLabel0.text = "";
        this.contentLabel1.text = "";
        
        this.detailScroller.touchChildren =  false;
        this.detailScroller.touchEnabled = false;

        //显示奖品1
        if(json[0]){
            this.prizeID0 = json[0].prizenum;

            this.contentLabel0.text = json[0].prizemsg;
            this.contentLabel0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabel0Touch, this);
        }
        //显示奖品2
        if(json[1]) {
            this.prizeID1 = json[1].prizenum;
 
            this.contentLabel1.text = json[1].prizemsg;
            this.contentLabel1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLabel1Touch,this);
        }
        
        LayerManager.getInstance().popLayer.addChild(this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
    }
    
    private onOKBtnTouch():void{
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOKBtnTouch,this);
        this.parent && this.parent.removeChild(this);
    }
    
    private onLabel0Touch():void{
        this.showDetail(parseInt(this.prizeID0));
    }
    
    private onLabel1Touch():void{
        this.showDetail(parseInt(this.prizeID1));
    }
    
    public showDetail(prizeID:number):void{
        
        this.detailScroller.touchChildren = true;
        this.detailScroller.touchEnabled = true;
        
        //清理详情页
        this.codeLabel.text = "";
        
        //显示详情页
        this.codeLabel.text = "";
        for(var i: number = 0;i < this.prizeNum;i++) {
            this.detailList[i] && (this.detailList[i].visible = false);
        }
        if(this.detailList[prizeID-1]){  //有些奖品无详情页
            this.detailList[prizeID - 1].visible = true; //奖品id 1-8， 详情页0-6，现金无详情页，所以少一页
            //this.codeLabel.text = "兑换号:" + GameConst.phone;
            this.codeLabel.text = "兑换号:" + egret.localStorage.getItem("gzrb");
            this.detailGroup.visible = true;
            //监听
            this.detailGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onDetailBegin,this);
            this.detailGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDetailTouch,this);
        }
    }
    
    private beginY:number = 0;
    private onDetailBegin(e:egret.TouchEvent){
        this.beginY = e.stageY;
    }
    
    private onDetailTouch(e:egret.TouchEvent):void{
        if(e.stageY != this.beginY){ //滑动后不关闭页面
            return;
        }
        this.detailGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onDetailBegin,this);
        this.detailGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onDetailTouch,this);
        this.detailGroup.visible = false;
        this.detailScroller.touchChildren = false;
        this.detailScroller.touchEnabled = false;
    }
}











