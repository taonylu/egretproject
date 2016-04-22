/**
 *  文 件 名： SimpleMC.ts
 *  功    能： 简单MC
 *  内    容： 简化了新建json和png以及Factory的代码
 *  作    者： Rikimaru
 *  生成日期：2015/9/23
 *  修改日期：2015/9/23
 *  修改日志：
 */
class SimpleMC extends egret.MovieClip {
    public constructor() {
        super();
    }
    
    /**
     * 设置movieClip
     * @pngName 图片名
     * @jsonName json名
     * @mcName  mc名
     */ 
    public setMovieClip(pngName: string,jsonName: string,mcName: string){
        var png = RES.getRes(pngName);
        var json = RES.getRes(jsonName);
        var mcF: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,png);
        this.movieClipData = mcF.generateMovieClipData(mcName);
        this.anchorOffsetX = 32;
        this.anchorOffsetY = 32;
    }

}
