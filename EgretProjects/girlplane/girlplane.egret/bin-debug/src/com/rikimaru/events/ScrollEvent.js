/**
*  文 件 名：ScrollEvent.ts
*  功    能： 滚动事件
*  内    容： 自定义组件ItemScroll事件
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2015/8/22
*  修改日志：
*/
var ScrollEvent = (function (_super) {
    __extends(ScrollEvent, _super);
    function ScrollEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var __egretProto__ = ScrollEvent.prototype;
    /**开始滑动*/
    ScrollEvent.CHANGE_START = "changeStart";
    /**滑动超出最后一项*/
    ScrollEvent.OVER_STEP = "overStep";
    return ScrollEvent;
})(egret.Event);
ScrollEvent.prototype.__class__ = "ScrollEvent";
