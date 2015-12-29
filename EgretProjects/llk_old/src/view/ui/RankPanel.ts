/**
*  文 件 名：RankPanel.ts
*  功    能：排行榜
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/14
*  修改日期：2015/9/14
*  修改日志：
*/
class RankPanel extends egret.gui.SkinnableComponent{
    private name1Label: egret.gui.Label;
    private name2Label: egret.gui.Label;
    private name3Label: egret.gui.Label;
    private score1Label: egret.gui.Label;
    private score2Label: egret.gui.Label;
    private score3Label: egret.gui.Label;
    private closeBtn: egret.gui.UIAsset;
    
    private nameList: Array<egret.gui.Label> = new Array<egret.gui.Label>();
    private scoreList: Array<egret.gui.Label> = new Array<egret.gui.Label>();
    
	public constructor() {
        super();
        this.skinName = skins.ui.RankPanelSkin;
	}
	
    public onEnable(): void { 
        this.nameList.push(this.name1Label,this.name2Label,this.name3Label);
        this.scoreList.push(this.score1Label,this.score2Label,this.score3Label);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtnTouch,this);
    }
    
    private onCloseBtnTouch(): void { 
        this.hide();
        ApplicationFacade.getInstance().sendNotification(GameMediator.PLAY_AGAIN);
    }
    
    public showRank(data:RankJSON): void {
        LayerManager.getInstance().uiPopLayer.addElement(this);
        for(var i: number = 0;i < 3;i++) {
            if(i < data.len) {
                this.nameList[i].text = StringTool.mixUnicodeToCh(data.name[i]);
                this.scoreList[i].text = data.score[i].toString();
            } else { 
                this.nameList[i].text = "";
                this.scoreList[i].text = "";
            }
        }
    }
    
    public hide(): void { 
        this.parent && LayerManager.getInstance().uiPopLayer.removeElement(this);
    }
}
















