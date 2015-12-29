/**
*  文 件 名：LoadingUI.ts
*  功    能: 加载时的遮罩，半透明黑色背景+圆形循环播放的进度条
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/23
*  修改日期：2015/9/23
*  修改日志：
*/
class LoadingUI extends egret.Sprite {
    private loadingMC: egret.MovieClip;
    
    public constructor() {
        super();
        
        this.graphics.beginFill(0x000000,0.2);
        this.graphics.drawRect(0,0,GameConst.StageWidth,GameConst.StageHeight);
        this.graphics.endFill();
        
        this.loadingMC = MCFactory.getOne("loadingmc2_json","loadingmc2_png","loadingmc2");
        this.loadingMC.x = this.width/2 - this.loadingMC.width*1.5;
        this.loadingMC.y = this.height/2 - this.loadingMC.height*1.5;
        this.addChild(this.loadingMC);
        
        this.touchEnabled = false;
    }
    
    public show(): void {
        LayerManager.getInstance().stage.addChild(this);
        this.loadingMC && this.loadingMC.gotoAndPlay(1,-1);
    }
    
    public hide(): void { 
        if(this.parent) { 
            LayerManager.getInstance().stage.removeChild(this);
            this.loadingMC.stop();
        }
    }

}
