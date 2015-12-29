/**
*  文 件 名：BaseScene.ts
*  功    能： 场景基类
*  内    容： 将场景自适应到容器的100%
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
class BaseScene extends egret.gui.SkinnableComponent {
    public constructor() {
        super();
        this.percentWidth = 100;
        this.percentHeight = 100;
        this.touchEnabled = false;
    }

    /**组建创建完毕的情况下，添加到舞台时执行*/
    public onEnable(): void {
        
    }

    /**移除界面时执行*/
    public onRemove(): void {

    }

    /**销毁界面时执行*/
    public onDestroy(): void {

    }
}
