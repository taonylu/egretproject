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
* 1. exml里从自定义组件中找到ItemScroller，并拖动到exml上
* 2. 将需要显示对象(图片或场景等)拖动到ItemScroller的Group下
* 3. 设置Group的布局为垂直or水平
*/
var ItemScroller = (function (_super) {
    __extends(ItemScroller, _super);
    function ItemScroller() {
        _super.call(this);
        /**当前滚动到第几项  0表示第1项*/
        this.curItemCount = 0;
        /**滚动时间*/
        this.delayScroll = 100;
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
            this.itemSize = this.viewport.width;
            this.itemNum = this.viewport.contentWidth / this.viewport.width;
        }
        else {
            this.isHScroller = false;
            this.itemSize = this.viewport.height;
            this.itemNum = this.viewport.contentHeight / this.viewport.height;
        }
        //滚动容器设置
        this.horizontalScrollBar.thumb.visible = false;
        this.verticalScrollBar.thumb.visible = false;
        this.throwSpeed = 0;
        this.bounces = false;
        this.addEventListener(eui.UIEvent.CHANGE_START, this.onChangeStartHandler, this);
        this.addEventListener(eui.UIEvent.CHANGE_END, this.onChangeEndHandler, this);
    };
    p.onChangeStartHandler = function () {
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
        if (item >= 0 && item < this.itemNum) {
            this.curItemCount = item;
            egret.Tween.removeTweens(this.viewport);
            if (this.isHScroller) {
                egret.Tween.get(this.viewport).to({ scrollH: item * this.itemSize, ease: egret.Ease.quadOut }, this.delayScroll);
            }
            else {
                egret.Tween.get(this.viewport).to({ scrollV: item * this.itemSize, ease: egret.Ease.quadOut }, this.delayScroll);
            }
        }
    };
    /**销毁*/
    p.destroy = function () {
    };
    return ItemScroller;
})(eui.Scroller);
egret.registerClass(ItemScroller,'ItemScroller');
