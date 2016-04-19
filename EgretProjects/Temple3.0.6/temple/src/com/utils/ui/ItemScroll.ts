/**
*  文 件 名：ItemScroll.ts
*  功    能： 滚动组件
*  内    容： 自定义组件，支持多张图片水平(垂直)切换滚动
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2016/3/7
*  修改日志：
* 
* Example:
* 1. 从自定义组件中找到ItemScroller，并拖动到exml上
* 2. 将需要显示对象(图片等)拖动到ItemScroller的Group下
* 3. 设置Group的布局为垂直or水平
* 4. 即可
*/
class ItemScroller extends eui.Scroller{
    /**滚动项数量*/
    public itemNum: number;
    /**单个滚动项长度*/
    public itemSize: number;
    /**当前滚动到第几项  0表示第1项*/
    public curItemCount: number = 0;
    /**滚动时间*/
    public delayScroll: number = 100;
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
            this.itemSize = this.viewport.width;
            this.itemNum = this.viewport.contentWidth / this.viewport.width;
        } else{
            this.isHScroller = false;
            this.itemSize = this.viewport.height;
            this.itemNum = this.viewport.contentHeight/this.viewport.height;
        }
        
        //滚动容器设置
        this.horizontalScrollBar.thumb.visible = false;
        this.verticalScrollBar.thumb.visible = false;
        this.throwSpeed = 0;
        this.bounces = false;
        this.addEventListener(eui.UIEvent.CHANGE_START,this.onChangeStartHandler,this);
        this.addEventListener(eui.UIEvent.CHANGE_END,this.onChangeEndHandler, this);
    }
    
    private onChangeStartHandler(){
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
        
        if(dict > 0) {
            this.scrollToNext();
        } else if(dict < 0) {
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
                egret.Tween.get(this.viewport).to({ scrollH: item * this.itemSize,ease: egret.Ease.quadOut },this.delayScroll);
            }else{
                egret.Tween.get(this.viewport).to({ scrollV: item * this.itemSize,ease: egret.Ease.quadOut },this.delayScroll);
            }
        }
    }
    
    /**销毁*/
    public destroy(){
        
    }
    
}

















