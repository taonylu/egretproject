/**
*  文 件 名：HomeScene.ts
*  功    能：主页场景
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
class MCFactory {
    
    /**
     * 获取MovieClip
     */ 
    public static getOne(jsonUrl:string , pngUrl:string, mcName:string): egret.MovieClip { 
        var json = RES.getRes(jsonUrl);
        var png = RES.getRes(pngUrl);
        var mcF: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,png);
        return new egret.MovieClip(mcF.generateMovieClipData(mcName));
    }
    
    
}
