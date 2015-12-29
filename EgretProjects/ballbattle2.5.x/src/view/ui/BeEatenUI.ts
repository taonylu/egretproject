/**
 *  文 件 名：BeEatenUI.ts
 *  功    能：被吃掉后，显示的弹出框
 *  内    容：
 *  作    者： 羊力大仙
 *  生成日期：2015/10/10
 *  修改日期：2015/10/10
 *  修改日志：
 */
class BeEatenUI extends egret.gui.SkinnableComponent{
    private titleLabel: egret.gui.Label;
    private continueBtn: egret.gui.Button;
    
    private titleBuffer: string;
    
	public constructor() {
        super();
        this.skinName = skins.ui.BeEatenUISkin;
	}
	
    public childrenCreated(): void { 
        this.titleLabel.text = "你被" + this.titleBuffer + "吃掉了";
        this.x = (GameConst.StageWidth - this.width) / 2;
        this.y = (GameConst.StageHeight - this.height) / 2;
    }
    
    public show(): void {
        LayerManager.getInstance().uiSceneLayer.addElement(this);
        this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onContinueBtnClick,this);
    }
    
    public setTitle(userName:string): void { 
        this.titleBuffer = userName;
        if(this.initialized) { 
            this.titleLabel.text = "你被" + userName + "吃掉了";
        }
    }
   
    private onContinueBtnClick(): void {
        LayerManager.getInstance().uiSceneLayer.removeElement(this);
        ApplicationFacade.getInstance().sendNotification(GameMediator.QUIT_GAME);
    }
	
	
}
