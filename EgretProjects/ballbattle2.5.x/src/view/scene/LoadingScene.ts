/**
*  文 件 名：LoadingScene.ts
*  功    能：主页场景
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
class LoadingScene extends BaseScene{
    private loadingMC: egret.MovieClip;
    private contentGroup: egret.gui.Group;
    
	public constructor() {
        super();
        this.skinName = skins.scene.LoadSceneSkin;
	}
	
    public childrenCreated(): void { 
        this.loadingMC = MCFactory.getOne("loading_json","loading_png","loading");
        this.loadingMC.x = this.width - this.loadingMC.width/2;
        this.loadingMC.y = this.height - this.loadingMC.height;
        this.contentGroup.addElement(new egret.gui.UIAsset(this.loadingMC));
        this.onEnable();
    }
    
    public onEnable(): void { 
        this.loadingMC.play(-1);
    }
    
    public onRemove(): void { 
        this.loadingMC.stop();
    }
}
