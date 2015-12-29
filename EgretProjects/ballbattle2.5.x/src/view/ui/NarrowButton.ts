/**
*  文 件 名：NarrowButton.ts
*  功    能: 点击后可以缩小的按钮
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/10/14
*  修改日期：2015/10/14
*  修改日志：
*/
class NarrowButton extends egret.gui.SkinnableComponent{
    public static MODE_BIG:number = 0;
    public static MODE_SMALL:number = 1;
    private narrowScale:number = 0.9;
    private narrowTime: number = 100;
    
	public constructor() {
        super();
        this.touchChildren = false;
        this.touchEnabled = true;   
	}
	
    public childrenCreated(): void { 
        super.childrenCreated();
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x += this.width / 2;
        this.y += this.height / 2;
        this.configListeners();
    }

    public setMode(mode:number):void{
        if(mode == NarrowButton.MODE_BIG){
            this.narrowScale = 1.1;
        }else if (mode == NarrowButton.MODE_SMALL){
            this.narrowScale = 0.9;
        }
    }
	
    private configListeners():void{
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    }

    private addStageListeners():void{
        egret.gui.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd,this);
    }

    private removeStageListeners():void{
        egret.gui.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd,this);
    }

    private touchBegin():void{
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({scaleX:this.narrowScale, scaleY:this.narrowScale},this.narrowTime);
        this.addStageListeners();
    }

    private touchEnd():void{
        this.removeStageListeners();
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({scaleX:1, scaleY:1},this.narrowTime);
    }

}
