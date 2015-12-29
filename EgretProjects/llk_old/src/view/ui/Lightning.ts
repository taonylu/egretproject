/**
*  文 件 名：Lightning.ts
*  功    能：闪电
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
class Lightning extends egret.MovieClip{
    public static NAME: string = "Lightning";
    public constructor() {
        super();
        var json = RES.getRes("shandian_json");
        var png = RES.getRes("shandian_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,png);
        this.movieClipData = mcFactory.generateMovieClipData("shandian");
    }
    
    public playMC(): void { 
        this.alpha = 1;
        this.gotoAndPlay(1);
        egret.Tween.get(this).wait(300).to({ alpha: 0 },100).call(this.onComplete,this);
    }
    
    private onComplete(): void { 
        this.stop();
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Lightning.NAME).returnObject(this);
    }
    
    
}
