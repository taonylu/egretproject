/**
*  文 件 名：EnterGamePanel.ts
*  功    能   : 进入游戏面板
*  内    容： 进入游戏前，选择道具等
*  作    者： Rikimaru
*  生成日期：2015/8/23
*  修改日期：2015/8/23
*  修改日志：
*/
class EnterGamePanel extends egret.gui.SkinnableComponent{
    /**开始*/
    private startBtn: egret.gui.UIAsset;
    /**关闭*/
    private closeBtn: egret.gui.UIAsset;
    
	public constructor() {
        super();
        this.skinName = skins.ui.EnterGamePanelSkin;
	}
	
    public childrenCreated(): void { 
        this.onEnable();
    }
    
    public onEnable(): void { 
        this.x = LayerManager.getInstance().uiStage.width / 2 - this.width / 2;
        this.y = LayerManager.getInstance().uiStage.height / 2 - this.height / 2;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    public onRemove(): void { 
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    private onTouchTap(e: egret.TouchEvent): void { 
        switch(e.target) { 
            case this.startBtn:
                var layerManager: LayerManager = LayerManager.getInstance();
                layerManager.showLoading();
                var self: EnterGamePanel = this;
                LoadManager.getInstance().loadGroup(GameConfig.GN_Game,this,function(): void {
                    layerManager.uiPopLayer.removeElement(self);
                    layerManager.hideLoading();
                    layerManager.replaceScene(GameConfig.SN_Game,STween.R);
                });
                break;
            case this.closeBtn:
                LayerManager.getInstance().uiPopLayer.removeElement(this);
                break;
        }
    }
    
}














