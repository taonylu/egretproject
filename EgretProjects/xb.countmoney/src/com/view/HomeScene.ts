/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private money: eui.Image;
    private initMoneyPosY: number;  //money初始位置
    
	public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initMoneyPosY = this.money.y;
    }

    public onEnable(): void {
        this.money.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }

    public onRemove(): void {
        this.money.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }
    
    private isDrag: Boolean = false;  //是否拖拽状态
    private beginY: number;           //触摸初始位置
    
    private onTouchBegin(e: egret.TouchEvent): void {
        this.isDrag = true;
        this.beginY = e.stageY;
    }

    private onTouchMove(e:egret.TouchEvent): void {
        if(this.isDrag) {
            
            this.money.y += e.stageY - this.beginY;
            this.beginY = e.stageY;
        }
    }
    
    private onTouchEnd(e: egret.TouchEvent): void {
        if(this.isDrag && (Math.abs(this.money.y - this.initMoneyPosY) > 10)) {
            
            
            
            
            var time: number = (this.money.y / this.initMoneyPosY) * 200;
            egret.Tween.get(this.money).to({ y: -this.money.height },time).call(function() {
                LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
            });
        }
    }
}








