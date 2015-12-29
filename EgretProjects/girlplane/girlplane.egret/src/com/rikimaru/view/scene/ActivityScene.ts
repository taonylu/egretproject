/**
*  文 件 名：ActivityScene.ts
*  功    能：活动界面
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2015/8/22
*  修改日志：
*/
class ActivityScene extends BaseScene{
    /**左箭头*/
    private leftArrow: egret.gui.UIAsset;
    /**右箭头*/
    private rightArrow: egret.gui.UIAsset;
    /**radio*/
    private radio1: egret.gui.UIAsset;
    /**radio*/
    private radio2: egret.gui.UIAsset;
    /**radio*/
    private radio3: egret.gui.UIAsset;
    /**radio*/
    private radio4: egret.gui.UIAsset;
    /**圆*/
    private circle: egret.gui.UIAsset;
    /**滚动面板*/
    private scroll: ItemScroll;
    /**知道*/
    private konwBtn: egret.gui.Button;
    /**知道图片*/
    private knowPng: egret.gui.UIAsset;
    /**radio数组*/
    private radioList: Array<egret.gui.UIAsset>;
    
    
	public constructor() {
        super();
        this.skinName = skins.scene.ActivitySceneSkin;
	}
	
    public childrenCreated(): void { 
        this.knowPng.touchEnabled = false;
        this.radioList = new Array<egret.gui.UIAsset>();
        this.radioList.push(this.radio1,this.radio2,this.radio3,this.radio4);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap,this);
        this.scroll.addEventListener(ScrollEvent.CHANGE_START, this.onScrollChangeStart,this);
        this.moveArrowToLeft();
    }
    
    public onEnable(): void { 
        this.moveArrowToLeft();
    }
    
    public onRemove(): void { 
        this.stopArrowMove();
    }
    
    private onTouchTap(e: egret.TouchEvent): void { 
        switch(e.target) { 
            case this.leftArrow:
                this.scroll.scrollToLeft();
                break;
            case this.rightArrow:
                this.scroll.scrollToRight();
                break;
            case this.konwBtn:
                this.stopArrowMove();
                LayerManager.getInstance().replaceScene(GameConfig.SN_LoadingA);
                LoadManager.getInstance().loadGroup(GameConfig.GN_Home,this,function(): void {
                    LayerManager.getInstance().replaceScene(GameConfig.SN_Home);
                });
                break;
        }
    }
    
    /**点击箭头后，改变radio*/
    private onScrollChangeStart(): void { 
        var radio: egret.gui.UIAsset = this.radioList[this.scroll.itemCount];
        this.circle.x = radio.x;
        this.circle.y = radio.y;
        
    }
    
    private delay: number = 300;
    private dist: number = 15;
    /**箭头动画*/
    private moveArrowToLeft(): void { 
        egret.Tween.get(this.leftArrow).to({ x: this.leftArrow.x + this.dist, ease:egret.Ease.quartOut },this.delay);
        egret.Tween.get(this.rightArrow).to({ x: (this.rightArrow.x  - this.dist), ease:egret.Ease.quartOut },this.delay).call(this.moveArrowToRight,this);
    }
    /**箭头动画*/
    private moveArrowToRight(): void { 
        egret.Tween.get(this.leftArrow).to({x:this.leftArrow.x-this.dist,ease:egret.Ease.quartOut },this.delay);
        egret.Tween.get(this.rightArrow).to({ x: (this.rightArrow.x + this.dist), ease:egret.Ease.quartOut },this.delay).call(this.moveArrowToLeft,this);
    }
    /**移除箭头动画*/
    private stopArrowMove(): void { 
        egret.Tween.removeTweens(this.leftArrow);
        egret.Tween.removeTweens(this.rightArrow);
    }
	
}
















