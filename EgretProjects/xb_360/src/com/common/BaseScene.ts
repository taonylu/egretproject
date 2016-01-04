/**
*  文 件 名：BaseScene.ts
*  功    能： 场景基类
*  内    容： 将场景自适应到容器的100%
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
class BaseScene extends eui.Component {
    public inited: Boolean = false;
    
    public constructor(skinName:string) {
        super();
        this.percentWidth = 100;
        this.percentHeight = 100;
        this.touchEnabled = false;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.componentCreated, this);
        this.skinName = skinName;
    }

    /**组件创建完毕并添加到舞台时触发
     *  组件皮肤在主题json已经加载完毕，所以在this.skinName=skinName时组件是已经创建完毕的
     *  组件addChild到舞台时，会触发eui.UIEvent.CREATION_COMPLETE，无需等待创建完毕
     */
    public componentCreated():void{
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE,this.componentCreated,this);
        this.inited = true;
    }
    
    public onEnable():void{
        
    }
    
    public onRemove():void{
        
    }
    
    public onDestroy():void{
        
    }

}
