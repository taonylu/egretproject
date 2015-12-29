/**
 *  文 件 名：BaseUI.ts
 *  功    能： 基类UI
 *  内    容：
 *  作    者： 羊力大仙
 *  生成日期：2015/9/23
 *  修改日期：2015/9/23
 *  修改日志：
 */
class BaseUI extends eui.Component {
    /**组件是否初始化完毕*/
    public inited:boolean = false;

    public constructor() {
        super();
        this.addEventListener(egret.Event.COMPLETE, this.componentCreated, this);
    }

    /**组件初始化完毕*/
    public componentCreated():void{
        this.inited = true;
    }
}
