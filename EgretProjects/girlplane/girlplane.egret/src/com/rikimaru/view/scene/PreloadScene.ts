/**
*  文 件 名：PreloadScene.ts
*  功    能： 加载界面
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/21
*  修改日期：2015/8/21
*  修改日志：
*/
class PreloadScene extends BaseScene{
    /**开始游戏*/
    private startBtn: egret.gui.Button;
    /**信息*/
    private infoBtn: egret.gui.Button;
    /**信息弹出框*/
    public infoWindow: TileWindow;
    /**加载条背景*/
    private loadBg: egret.gui.UIAsset;
    /**加载文本*/
    private loadLabel: egret.gui.Label;
    
	public constructor() {
        super();
        this.skinName = skins.scene.PreloadSceneSkin;
	}
	
    public childrenCreated(): void { 
        this.infoWindow.visible = false;
        this.loadBg.visible = false;
        this.loadLabel.visible = false;
        this.infoWindow.setText(GameConfig.Text_ProductInfo);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this); 
    }
    
    /**点击场景*/
    private onTouchTap(e:egret.TouchEvent): void { 
        switch(e.target) { 
            case this.startBtn:
                this.loadAsset();
            break;
            case this.infoBtn:
                this.infoWindow.visible = !this.infoWindow.visible;
                break;
        }
    }
    
    /**加载资源*/
    private loadAsset(): void { 
        this.startBtn.visible = false;
        this.loadBg.visible = true;
        this.loadLabel.visible = true;
        this.loadLabel.text = "";
        LoadManager.getInstance().loadGroup(GameConfig.GN_Activity,this,this.onLoadComplete,this.onLoadProgress);
    }
    
    /**加载进度*/
    private onLoadProgress(e:RES.ResourceEvent): void { 
        this.loadLabel.text = "游戏加载中..." + Math.round(e.itemsLoaded / e.itemsTotal * 100) + "%";
        }
    
    /**加载完成*/
    private onLoadComplete(): void { 
        LayerManager.getInstance().replaceScene(GameConfig.SN_Activity);
    }
    
}












