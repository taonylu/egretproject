/**
*  文 件 名：PreloadScene.ts
*  功    能：加载界面
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/11
*  修改日志：
*/
class PreloadScene extends BaseScene{
    //加载进度文本
    private loadLabel: egret.gui.Label;
    
	public constructor() {
        super();
        this.skinName = skins.scene.PreloadSceneSkin;
	}
	
    public setLoadLabel(str:string): void { 
        this.loadLabel.text = str;
    }
    
	
}
