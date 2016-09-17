/**
 * 滚动组件
 */
var ItemScroller = (function (_super) {
    __extends(ItemScroller, _super);
    function ItemScroller() {
        _super.call(this);
        /**当前滚动到第几项  0表示第1项*/
        this.curItemCount = 0;
        /**滚动时间*/
        this.delayScroll = 500;
        this.addEventListener(eui.UIEvent.COMPLETE, this.onCreateComplete, this);
    }
    var d = __define,c=ItemScroller,p=c.prototype;
    p.onCreateComplete = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onCreateComplete, this);
        //立即验证，获取width、height
        this.validateNow();
        //判断是垂直还是水平滚动
        var widthDist = this.viewport.contentWidth - this.viewport.width;
        if (widthDist > 0) {
            this.isHScroller = true;
            this.itemSize = Math.round(this.viewport.width);
            this.itemNum = Math.round(this.viewport.contentWidth / this.viewport.width);
        }
        else {
            this.isHScroller = false;
            this.itemSize = Math.round(this.viewport.height);
            this.itemNum = Math.round(this.viewport.contentHeight / this.viewport.height);
        }
        console.log(this.itemSize, this.itemNum);
        //滚动容器设置
        this.horizontalScrollBar.thumb.visible = false;
        this.verticalScrollBar.thumb.visible = false;
        this.throwSpeed = 0;
        this.bounces = false;
        this.addEventListener(eui.UIEvent.CHANGE_START, this.onChangeStartHandler, this);
        this.addEventListener(eui.UIEvent.CHANGE_END, this.onChangeEndHandler, this);
    };
    p.onChangeStartHandler = function (e) {
        if (this.isHScroller) {
            this.touchStartPos = this.viewport.scrollH;
        }
        else {
            this.touchStartPos = this.viewport.scrollV;
        }
    };
    p.onChangeEndHandler = function () {
        var dict;
        if (this.isHScroller) {
            dict = this.viewport.scrollH - this.touchStartPos;
        }
        else {
            dict = this.viewport.scrollV - this.touchStartPos;
        }
        console.log(this.viewport.scrollV, this.touchStartPos);
        if (dict > 0) {
            this.scrollToNext();
        }
        else if (dict < 0) {
            this.scrollToLast();
        }
    };
    /**滑动到下一项*/
    p.scrollToNext = function () {
        var item = this.curItemCount;
        if (item < this.itemNum - 1) {
            item++;
        }
        this.scrollToItem(item);
    };
    /**滑动到上一项*/
    p.scrollToLast = function () {
        var item = this.curItemCount;
        if (item > 0) {
            item--;
        }
        this.scrollToItem(item);
    };
    /**
     * 滚动到指定项 (0是第一项)
     * @item 指定项
     */
    p.scrollToItem = function (item) {
        var _this = this;
        if (item >= 0 && item < this.itemNum) {
            this.curItemCount = item;
            egret.Tween.removeTweens(this.viewport);
            if (this.isHScroller) {
                egret.Tween.get(this.viewport).
                    to({ scrollH: item * this.itemSize, ease: egret.Ease.quadOut }, this.delayScroll).
                    call(function () { _this.dispatchEventWith(ItemScroller.ScrollDone, false, _this.curItemCount); });
            }
            else {
                egret.Tween.get(this.viewport).to({ scrollV: item * this.itemSize, ease: egret.Ease.quadOut }, this.delayScroll).
                    call(function () { _this.dispatchEventWith(ItemScroller.ScrollDone, false, _this.curItemCount); });
                ;
            }
        }
    };
    /**销毁*/
    p.destroy = function () {
    };
    ItemScroller.ScrollDone = "ScrollDone"; //滚动完成
    return ItemScroller;
}(eui.Scroller));
egret.registerClass(ItemScroller,'ItemScroller');
