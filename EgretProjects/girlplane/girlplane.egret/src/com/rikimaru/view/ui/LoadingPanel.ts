/**
*  文 件 名：LoadingPanel.ts
*  功    能   : 加载动画的窗口
*  内    容： 用于游戏全局加载动画，显示在场景前方，并使用透明背景遮挡场景的按钮
*  作    者： Rikimaru
*  生成日期：2015/8/23
*  修改日期：2015/8/23
*  修改日志：
*/
class LoadingPanel extends egret.gui.SkinnableContainer{
    /**加载动画*/
    private loadingAnim: LoadingAnim;
    /**背景*/
    private bg: egret.Sprite;
    
    public constructor() {
        super();
        this.skinName = skins.ui.LoadingPanelSkin;
    }
    
    public childrenCreated(): void { 
        //透明背景
        this.bg = new egret.Sprite();
        this.bg.graphics.beginFill(0x000000,0);
        this.bg.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeight);
        this.bg.graphics.endFill();
        this.addElement(new egret.gui.UIAsset(this.bg));
        
        this.onEnable();
    }
    
    public onEnable(): void { 
        if(this.loadingAnim) { 
            this.loadingAnim.play();
        } 
    }
        
    public onRemove(): void { 
        if(this.loadingAnim) { 
            this.loadingAnim.stop();
        }
    }
   
}
