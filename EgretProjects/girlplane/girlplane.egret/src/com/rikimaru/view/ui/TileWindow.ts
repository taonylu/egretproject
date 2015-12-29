/**
*  文 件 名：TileWindow.ts
*  功    能： 弹出框类
*  内    容： 自定义弹出框，1背景+1文本+1关闭按钮
*  作    者： Rikimaru
*  生成日期：2015/8/21
*  修改日期：2015/8/21
*  修改日志：
*/
class TileWindow extends egret.gui.SkinnableComponent{
    /**关闭按钮*/
    private closeBtn:egret.gui.Button;
    /**内容文本*/
    private contentLabel: egret.gui.Label;

	
    public childrenCreated(): void { 
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch,this);
    }

    /**设置显示文本*/
    public setText(text:string): void { 
          this.contentLabel.text = text;
    }
	
    /**点击关闭按钮*/
    private onCloseBtnTouch(): void { 
        this.visible = false;
    }
	
}
