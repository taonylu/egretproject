/**
*  文 件 名：HomeScene.ts
*  功    能：主页场景
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
var MCFactory = (function () {
    function MCFactory() {
    }
    var __egretProto__ = MCFactory.prototype;
    /**
     * 获取MovieClip
     */
    MCFactory.getOne = function (jsonUrl, pngUrl, mcName) {
        var json = RES.getRes(jsonUrl);
        var png = RES.getRes(pngUrl);
        var mcF = new egret.MovieClipDataFactory(json, png);
        return new egret.MovieClip(mcF.generateMovieClipData(mcName));
    };
    return MCFactory;
})();
MCFactory.prototype.__class__ = "MCFactory";
