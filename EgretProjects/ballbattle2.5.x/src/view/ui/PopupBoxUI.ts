/**
*  文 件 名：PopupBoxUI.ts
*  功    能: 弹出框，连接失败等提示框
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/24
*  修改日期：2015/9/24
*  修改日志：
*/
class PopupBoxUI extends egret.gui.SkinnableComponent{
    private msgLabel: egret.gui.Label;
    private msgBuffer: string;
    
    public constructor() {
       super();
       this.skinName = skins.ui.PopupBoxUISkin;
    }
	
    public childrenCreated(): void { 
        this.x = (GameConst.StageWidth - this.width) / 2;
        this.y = (GameConst.StageHeight - this.height) / 2;
        this.msgLabel.text = this.msgBuffer;
    }
    
    public showMsg(msg:string): void {
        LayerManager.getInstance().uiPopLayer.addElement(this);
        this.msgBuffer = msg;
        if(this.initialized) { 
            this.msgLabel.text = msg;
        }
        var self: PopupBoxUI = this;
        egret.Tween.get(this).wait(1000).call(function(): void { 
            self.hide();
            })
    }
    
    public hide(): void { 
        if(this.parent) { 
            LayerManager.getInstance().uiPopLayer.removeElement(this);
        }
    }
}
