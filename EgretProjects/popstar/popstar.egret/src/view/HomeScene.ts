/**
 *
 * @author 
 *
 */
class HomeScene extends BaseScene{
    
    /**新游戏*/
    private newBtn: egret.gui.UIAsset;
    /**继续游戏*/
    private continueBtn: egret.gui.UIAsset;
    /**商城*/
    private shopBtn: egret.gui.UIAsset;
    
	public constructor() {
        super();
        this.skinName = skins.scene.HomeSceneSkin;
        this.touchEnabled = false;
	}
	
    protected onEnable(): void { 
        this.newBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNewBtnTouch, this);
    }
    
    protected onRemove(): void { 
        this.newBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onNewBtnTouch, this);
    }
    
    private onNewBtnTouch(e: egret.TouchEvent): void { 
        App.getInstance().runScene(AppConst.SceneID_Game);
    }
	
	
	
	
}
