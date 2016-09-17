/**
 * 滚动组件
 */ 
class ItemScroller extends eui.Scroller{
    public static ScrollDone: string = "ScrollDone"; //滚动完成
    /**滚动项数量*/
    public itemNum: number;
    /**单个滚动项长度*/
    public itemSize: number;
    /**当前滚动到第几项  0表示第1项*/
    public curItemCount: number = 0;
    /**滚动时间*/
    public delayScroll: number = 500;
    /**是否是水平滚动*/
    public isHScroller: Boolean;
    /**触摸起始位置*/
    private touchStartPos: number;
    /**当前触摸位置和起始触摸位置距离*/
    private touchDist: number;

	public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onCreateComplete, this);
	}
	
    private onCreateComplete(): void {
        this.removeEventListener(eui.UIEvent.COMPLETE,this.onCreateComplete,this);
        
        //立即验证，获取width、height
        this.validateNow();
        
        //判断是垂直还是水平滚动
        var widthDist:number = this.viewport.contentWidth - this.viewport.width;
        if(widthDist > 0) {
            this.isHScroller = true;
            this.itemSize = Math.round(this.viewport.width);
            this.itemNum = Math.round(this.viewport.contentWidth / this.viewport.width);
        } else{
            this.isHScroller = false;
            this.itemSize = Math.round(this.viewport.height);
            this.itemNum = Math.round(this.viewport.contentHeight/this.viewport.height);
        }
        console.log(this.itemSize, this.itemNum);
        
        //滚动容器设置
        this.horizontalScrollBar.thumb.visible = false;
        this.verticalScrollBar.thumb.visible = false;
        this.throwSpeed = 0;
        this.bounces = false;
        this.addEventListener(eui.UIEvent.CHANGE_START,this.onChangeStartHandler,this);
        this.addEventListener(eui.UIEvent.CHANGE_END,this.onChangeEndHandler, this);
    }
    
    private onChangeStartHandler(e:eui.UIEvent){
        if(this.isHScroller){
            this.touchStartPos = this.viewport.scrollH; 
        }else{
            this.touchStartPos = this.viewport.scrollV;
        }
    }
    
    private onChangeEndHandler(): void {
       
        var dict:number;
        if(this.isHScroller){
            dict = this.viewport.scrollH - this.touchStartPos; 
        }else{
            dict = this.viewport.scrollV - this.touchStartPos; 
        }
        console.log(this.viewport.scrollV,this.touchStartPos);
        
        if(dict > 0) {
            this.scrollToNext();
        } else if (dict < 0){
            this.scrollToLast();
        }
    }
    
    /**滑动到下一项*/
    public scrollToNext(): void {
        var item: number = this.curItemCount;
        if(item < this.itemNum - 1) {
            item++;
        }
        this.scrollToItem(item);
    }
    
    /**滑动到上一项*/
    public scrollToLast(): void { 
        var item: number = this.curItemCount;
        if(item > 0) {
            item--;
        }
        this.scrollToItem(item);
    }

    /**
     * 滚动到指定项 (0是第一项)
     * @item 指定项
     */ 
    public scrollToItem(item: number): void {
        if(item >= 0 && item < this.itemNum) { 
            this.curItemCount = item;
            egret.Tween.removeTweens(this.viewport);
            if(this.isHScroller){
                egret.Tween.get(this.viewport).
                to({ scrollH: item * this.itemSize,ease: egret.Ease.quadOut },this.delayScroll).
                    call(() => { this.dispatchEventWith(ItemScroller.ScrollDone, false,this.curItemCount)});
            }else{
                egret.Tween.get(this.viewport).to({ scrollV: item * this.itemSize,ease: egret.Ease.quadOut },this.delayScroll).
                    call(() => { this.dispatchEventWith(ItemScroller.ScrollDone,false,this.curItemCount) });;
            }
        }
    }
    
    /**销毁*/
    public destroy(){
        
    }
    
}

















