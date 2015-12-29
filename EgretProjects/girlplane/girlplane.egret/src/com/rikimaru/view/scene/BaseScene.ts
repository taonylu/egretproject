/**
*  文 件 名：BaseScene.ts
*  功    能： 游戏场景基类
*  内    容： 将场景自适应到容器的100%
*  作    者： Rikimaru
*  生成日期：2015/8/21
*  修改日期：2015/8/21
*  修改日志：
*/
class BaseScene extends  egret.gui.SkinnableComponent{
    public constructor() {
        super();
        this.percentWidth = 100;
        this.percentHeight = 100;
        this.touchEnabled = false;
    }
    
    /**添加界面时执行，首次创建并添加场景时不会执行该函数
     * 因为组件尚未创建完成，不能在onEnable里访问
     * 首次创建时使用childrenCreated来执行
     */
    public onEnable(): void { 
        
    }
    
    /**移除界面时执行*/
    public onRemove(): void { 
        
    }
    
    /**销毁界面时执行*/
    public onDestroy(): void { 
        
    }
}
