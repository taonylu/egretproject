/**
*  文 件 名：ThroughScene.ts
*  功    能   : 选关界面
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/23
*  修改日期：2015/8/23
*  修改日志：
*/
class ThroughScene extends BaseScene{
    /**光环容器*/
    private lightGroup: egret.gui.Group;
    /**ui容器*/
    private uiGroup: egret.gui.Group;
    /**背景容器*/
    private bgGroup: egret.gui.Group;
    /**返回按钮*/
    private backBtn: egret.gui.UIAsset;
    /**关卡0*/
    private levelBtn0: LevelBtnUI;
    /**关卡1*/
    private levelBtn1: LevelBtnUI;
    /**关卡2*/
    private levelBtn2: LevelBtnUI;
    /**关卡列表*/
    private btnList: Array<LevelBtnUI>;
    /**光环动画*/
    private light: egret.gui.UIAsset;
    /**进入游戏前弹出框*/
    private enterGamePanel: EnterGamePanel;
    
    
    public constructor() {
        super();
        this.skinName = skins.scene.ThroughSceneSkin;
    }
	
    public childrenCreated(): void { 
        this.btnList = new Array<LevelBtnUI>();
        this.btnList.push(this.levelBtn0,this.levelBtn1,this.levelBtn2);
        
        for(var i: number = 0;i < 3;i++) { 
            this.btnList[i].setLevelNum(i + 1);
        }
        this.btnList[0].setState(LevelState.Cur);
        
        this.uiGroup.cacheAsBitmap = true;

        this.onEnable();
    }
    
    public onEnable(): void { 
        this.showLight();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    public onRemove(): void { 
        this.hideLight();
        this.hideEnterGamePanel();
    }
    
    private onTouchTap(e: egret.TouchEvent): void { 
        console.log(e.target);
        switch(e.target) { 
            case this.backBtn:
                LayerManager.getInstance().replaceScene(GameConfig.SN_Home,STween.R);
                break;
            case this.levelBtn0:
                this.showEnterGamePanel();
                break;
        }
    }
    
    
    /**显示关卡按钮光环*/
    public showLight(): void { 
        if(this.light == null) { 
            var png = RES.getRes("a_png");
            var json = RES.getRes("a_json");
            var mcF: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,png);
            var mc:egret.MovieClip = new egret.MovieClip(mcF.generateMovieClipData("a"));
            mc.scaleX = 1.5;
            mc.scaleY = 1.5;
            this.light = new egret.gui.UIAsset(mc);
        }
        this.light.x = this.btnList[0].x - 50;
        this.light.y = this.btnList[0].y + 30;
        (<egret.MovieClip>this.light.source).play(-1);
        this.lightGroup.addElement(this.light);
    }
    
    public hideLight(): void { 
        if(this.light != null) { 
            this.lightGroup.removeElement(this.light);
        }
    }
    /**显示进入游戏弹出框*/
    public showEnterGamePanel(): void { 
        if(this.enterGamePanel == null) { 
            this.enterGamePanel = new EnterGamePanel();
        }
        LayerManager.getInstance().uiPopLayer.addElement(this.enterGamePanel);
    }
    
    public hideEnterGamePanel(): void { 
        if(this.enterGamePanel != null && this.enterGamePanel.parent) { 
            LayerManager.getInstance().uiPopLayer.removeElement(this.enterGamePanel);
        }
    }
	
}















