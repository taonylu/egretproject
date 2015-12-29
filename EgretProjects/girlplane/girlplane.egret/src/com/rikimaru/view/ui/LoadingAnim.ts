/**
*  文 件 名：LoadAnimUI.ts
*  功    能   : 财产面板 
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2015/8/22
*  修改日志：
*/
class LoadingAnim extends egret.gui.SkinnableComponent{
    /**圆圈*/
    private circle: egret.gui.UIAsset;
    /**窗口类型*/
    private type: string;
    /**正常*/
    public static Type_Normal: string = "normal";
    /**旋转*/
    public static Type_Rotate: string = "rotate";
    
    public constructor() {
        super();
        this.skinName = skins.ui.LoadingAnimSkin;
    }
        
    public childrenCreated(): void { 
         this.circle.anchorOffsetX = this.circle.width / 2;
         this.circle.anchorOffsetY = this.circle.height / 2;
         this.circle.x += this.circle.width / 2;
         this.circle.y += this.circle.height / 2;
    } 
    
    public play(): void { 
        egret.Tween.get(this.circle,{loop:true}).to({ rotation: 360 },1000);
    }
    
    public stop(): void { 
        egret.Tween.removeTweens(this.circle);
    }
}








