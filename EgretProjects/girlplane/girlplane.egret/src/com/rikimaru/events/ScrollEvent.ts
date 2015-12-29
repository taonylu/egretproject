/**
*  文 件 名：ScrollEvent.ts
*  功    能： 滚动事件
*  内    容： 自定义组件ItemScroll事件
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2015/8/22
*  修改日志：
*/
class ScrollEvent extends egret.Event{
    
    /**开始滑动*/
    public static CHANGE_START:string = "changeStart";
    /**滑动超出最后一项*/
    public static OVER_STEP: string = "overStep";
    
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}
