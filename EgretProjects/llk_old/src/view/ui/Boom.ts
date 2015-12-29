/**
*  文 件 名：Boom.ts
*  功    能：爆炸
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
class Boom extends egret.MovieClip {
    public static NAME: string = "Boom";
    public constructor() {
        super();
        var json = RES.getRes("boom_json");
        var png = RES.getRes("boom_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,png);
        this.movieClipData = mcFactory.generateMovieClipData("boom");
        this.scaleX = 2;
        this.scaleY = 2;
    }

    public playMC(target:Block): void { 
        this.addEventListener(egret.Event.COMPLETE,this.onComplete, this);
        this.x = target.x;
        this.y = target.y;
        this.gotoAndPlay(10);
    }
    
    private onComplete(): void { 
        this.removeEventListener(egret.Event.COMPLETE,this.onComplete, this);
        this.stop();
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(Boom.NAME).returnObject(this);
    }
    
    public reset(): void { 
        this.gotoAndStop(1);
    }
}
