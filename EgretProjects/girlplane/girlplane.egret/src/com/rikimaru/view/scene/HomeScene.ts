/**
*  文 件 名：HomeScene.ts
*  功    能： 游戏主场景
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2015/8/22
*  修改日志：
*/
class HomeScene extends BaseScene{
    /**礼包*/
    private giftBtn: egret.gui.Button;
    /**推荐*/
    private tuiJianBtn: egret.gui.Button;
    /**冒险模式*/
    private riskBtn: egret.gui.Button;
    /**无尽模式*/
    private endlessBtn: egret.gui.Button;
    
	public constructor() {
        super();
        this.skinName = skins.scene.HomeSceneSkin;
	}
	
    public childrenCreated(): void { 
        this.onEnable();
    }
    
    public onEnable(): void { 
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    public onRemove(): void { 
        
    }
    
    private onTouchTap(e: egret.TouchEvent): void { 
        switch(e.target) { 
            case this.tuiJianBtn:   //礼包
                LayerManager.getInstance().replaceScene(GameConfig.SN_Activity,STween.R);
                break;
            case this.riskBtn:
                var layer: LayerManager = LayerManager.getInstance();
                layer.showLoading();
                LoadManager.getInstance().loadGroup(GameConfig.GN_through,this,function(): void {
                    layer.hideLoading();
                    layer.replaceScene(GameConfig.SN_Through,STween.R);
                });
                
                break;
        }
    }
    
    
}










