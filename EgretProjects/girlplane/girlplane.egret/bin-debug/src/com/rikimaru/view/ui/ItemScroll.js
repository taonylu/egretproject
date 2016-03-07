/**
*  文 件 名：ItemScroll.ts
*  功    能： 滚动组件
*  内    容： 自定义组件，支持多张图片水平切换滚动
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2015/8/22
*  修改日志：
*/
var ItemScroll = (function (_super) {
    __extends(ItemScroll, _super);
    function ItemScroll() {
        _super.call(this);
        /**当前滚动到第几项  0表示第1项*/
        this.itemCount = 0;
        /**触发滚动的最小值*/
        this.minScrollDict = 50;
        /**滚动时间*/
        this.delayScroll = 100;
        this.skinName = "";
    }
    var __egretProto__ = ItemScroll.prototype;
    __egretProto__.childrenCreated = function () {
        this.horizontalScrollPolicy = egret.gui.ScrollPolicy.OFF;
        this.itemNum = this.viewport.contentWidth / this.viewport.width;
        this.itemWidth = this.viewport.width;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    /**触摸开始*/
    __egretProto__.onTouchBegin = function (e) {
        this.touchStartPos = e.stageX;
        this.touchDist = e.stageX;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    /**触摸移动，视口随触摸位置移动*/
    __egretProto__.onTouchMove = function (e) {
        this.viewport.horizontalScrollPosition -= e.stageX - this.touchDist;
        this.touchDist = e.stageX;
    };
    /**触摸结束，起始点和终点距离超过触发滚动最小值时，产生滚动效果*/
    __egretProto__.onTouchEnd = function (e) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        var dict = this.touchStartPos - e.stageX;
        if (dict > this.minScrollDict) {
            this.scrollToRight();
        }
        else if (dict < -this.minScrollDict) {
            this.scrollToLeft();
        }
        else {
            this.scrollToItem(this.itemCount);
        }
    };
    /**向左滑动一项*/
    __egretProto__.scrollToLeft = function () {
        var item = this.itemCount;
        if (item > 0) {
            item--;
        }
        this.scrollToItem(item);
    };
    /**向右滑动一项*/
    __egretProto__.scrollToRight = function () {
        var item = this.itemCount;
        if (item < this.itemNum - 1) {
            item++;
        }
        else {
            this.dispatchEvent(new ScrollEvent(ScrollEvent.OVER_STEP));
        }
        this.scrollToItem(item);
    };
    /**滚动到指定项的位置，第一项是0*/
    __egretProto__.scrollToItem = function (item) {
        if (item >= 0 && item < this.itemNum) {
            this.itemCount = item;
            egret.Tween.removeTweens(this.viewport);
            egret.Tween.get(this.viewport).to({ horizontalScrollPosition: item * this.itemWidth, ease: egret.Ease.quadOut }, this.delayScroll);
            this.dispatchEvent(new ScrollEvent(ScrollEvent.CHANGE_START));
        }
    };
    return ItemScroll;
})(egret.gui.Scroller);
ItemScroll.prototype.__class__ = "ItemScroll";
