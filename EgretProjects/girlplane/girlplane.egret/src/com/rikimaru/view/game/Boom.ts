
/**
*  文 件 名：Boom.ts
*  功    能：爆炸类
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
class Boom extends egret.MovieClip{
    public static NAME: string = "Boom";
	public constructor() {
        super();
        var png = RES.getRes("boom_png");
        var json = RES.getRes("boom_json");
        var mcF: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,png);
        this.movieClipData = mcF.generateMovieClipData("boom");
        this.anchorOffsetX = this.width;
        this.anchorOffsetY = this.height;
        this.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
        
	}
    
    private onComplete(): void { 
        this.stop();
        this.parent && this.parent.removeChild(this);
        this.removeEventListener(egret.Event.COMPLETE,this.onComplete,this);
    }
}
